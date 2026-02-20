import axios from 'axios';

// External API for demo products
const external = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Backend API (Node/Express)
const backend = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Helper to set/remove JWT token on backend client
export function setAuthToken(token) {
  if (token) {
    backend.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete backend.defaults.headers.common.Authorization;
  }
}

export const getProducts = async () => {
  try {
    const { data } = await external.get('/products');
    return data.slice(0, 20);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Auth
export const register = (payload) => backend.post('/register', payload);
export const login = (payload) => backend.post('/login', payload);

// Wishlist
export const getWishlist = () => backend.get('/wishlist');
export const addWishlistItem = (item) => backend.post('/wishlist', item);
export const removeWishlistItem = (productId) => backend.delete(`/wishlist/${productId}`);

// Cart
export const getCart = () => backend.get('/cart');
export const addCartItem = (item) => backend.post('/cart', item);
export const updateCartQty = (productId, quantity) => backend.patch(`/cart/${productId}`, { quantity });
export const removeCartItem = (productId) => backend.delete(`/cart/${productId}`);

// Orders
export const getOrders = () => backend.get('/orders');
export const placeOrder = (orderPayload) => backend.post('/orders', orderPayload);

// Contact
export const sendContact = (payload) => backend.post('/contact', payload);

// Health (optional utility)
export const getApiHealth = () => backend.get('/health');