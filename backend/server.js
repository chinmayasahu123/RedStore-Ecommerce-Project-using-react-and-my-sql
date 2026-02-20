require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Utility: run queries safely
async function run(query, params = []) {
  const [rows] = await db.query(query, params);
  return rows;
}

// In-memory stores (do NOT persist to DB)
// carts: Map<userId, Array<{product_id:number, quantity:number}>>
// orders: Map<userId, Array<{id:number, total_amount:number, created_at:string}>>
// orderItems: Map<orderId, Array<{product_id:number, quantity:number, price:number}>>
// tracking: Map<orderId, string>
const memoryStore = {
  carts: new Map(),
  orders: new Map(),
  orderItems: new Map(),
  tracking: new Map(),
  nextOrderId: 1,
};

// Create tables if not exist
async function ensureTables() {
  // Users table (existing name 'user')
  await run(`CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`);

  await run(`CREATE TABLE IF NOT EXISTS wishlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB`);

  await run(`CREATE TABLE IF NOT EXISTS wishlist_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wishlist_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_item (wishlist_id, product_id),
    FOREIGN KEY (wishlist_id) REFERENCES wishlists(id) ON DELETE CASCADE
  ) ENGINE=InnoDB`);

  // Note: No carts/cart_items/orders/order_items/order_tracking tables are created,
  // as these are intentionally kept in-memory per requirements.

  await run(`CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`);
}

ensureTables().catch((e) => {
  console.error('Error ensuring tables:', e);
  process.exit(1);
});

// Auth middleware
function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// ✅ Register User
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await run('SELECT id FROM user WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await run('INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login User
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await run('SELECT * FROM user WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const safeUser = { id: user.id, name: user.name, email: user.email };
    res.json({ message: 'Login successful', token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Wishlist
app.get('/api/wishlist', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const wl = await run('SELECT id FROM wishlists WHERE user_id = ?', [userId]);
    let wishlistId = wl[0]?.id;
    if (!wishlistId) {
      const result = await run('INSERT INTO wishlists (user_id) VALUES (?)', [userId]);
      wishlistId = result.insertId;
    }
    const items = await run('SELECT product_id FROM wishlist_items WHERE wishlist_id = ?', [wishlistId]);
    res.json(items.map(r => r.product_id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/wishlist', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });
    const wl = await run('SELECT id FROM wishlists WHERE user_id = ?', [userId]);
    const wishlistId = wl[0]?.id || (await run('INSERT INTO wishlists (user_id) VALUES (?)', [userId])).insertId;
    await run('INSERT IGNORE INTO wishlist_items (wishlist_id, product_id) VALUES (?, ?)', [wishlistId, productId]);
    res.json({ message: 'Added to wishlist' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/wishlist/:productId', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId, 10);
    const wl = await run('SELECT id FROM wishlists WHERE user_id = ?', [userId]);
    if (!wl[0]) return res.status(200).json({ message: 'Removed' });
    await run('DELETE FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?', [wl[0].id, productId]);
    res.json({ message: 'Removed' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ✅ Cart
app.get('/api/cart', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const items = memoryStore.carts.get(userId) || [];
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/cart', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });
    const cart = memoryStore.carts.get(userId) || [];
    const idx = cart.findIndex(i => i.product_id === productId);
    if (idx >= 0) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({ product_id: productId, quantity });
    }
    memoryStore.carts.set(userId, cart);
    res.json({ message: 'Added to cart' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.patch('/api/cart/:productId', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId, 10);
    const { quantity } = req.body;
    if (quantity == null) return res.status(400).json({ message: 'quantity required' });
    const cart = memoryStore.carts.get(userId) || [];
    const idx = cart.findIndex(i => i.product_id === productId);
    if (idx === -1) return res.status(404).json({ message: 'Item not found' });
    cart[idx].quantity = quantity;
    memoryStore.carts.set(userId, cart);
    res.json({ message: 'Quantity updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/cart/:productId', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId, 10);
    const cart = memoryStore.carts.get(userId) || [];
    const filtered = cart.filter(i => i.product_id !== productId);
    memoryStore.carts.set(userId, filtered);
    res.json({ message: 'Removed' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ✅ Orders (simplified)
app.get('/api/orders', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = memoryStore.orders.get(userId) || [];
    // Return newest first
    res.json([...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/orders', authRequired, async (req, res) => {
  try {
    const userId = req.user.id;
    const { items = [], totalAmount = 0 } = req.body; // items: [{productId, quantity, price}]
    const orderId = memoryStore.nextOrderId++;
    const created_at = new Date().toISOString();
    const order = { id: orderId, total_amount: totalAmount, created_at };

    const userOrders = memoryStore.orders.get(userId) || [];
    userOrders.push(order);
    memoryStore.orders.set(userId, userOrders);

    memoryStore.orderItems.set(orderId, items.map(it => ({
      product_id: it.productId,
      quantity: it.quantity,
      price: it.price || 0,
    })));
    memoryStore.tracking.set(orderId, 'PLACED');

    // Optionally clear cart after order
    memoryStore.carts.set(userId, []);

    res.json({ message: 'Order placed', orderId });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ✅ Contact messages
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'name, email, message required' });
    await run('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.json({ message: 'Message received' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ✅ Start Server
const PORT = process.env.PORT || 3001; // Use a different port, like 3001
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));