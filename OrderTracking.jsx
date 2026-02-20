import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBox, FaTruck, FaCheckCircle, FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';
import { OrdersContext } from '../../context/OrdersContext.jsx';

const OrderTracking = () => {
  const { orderId: routeOrderId } = useParams();
  const { orders } = useContext(OrdersContext);
  const [orderData, setOrderData] = useState(null);
  const [trackingId, setTrackingId] = useState(routeOrderId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showShare, setShowShare] = useState(false);

  const mockOrderData = {
    orderId: 'ORD123456789',
    status: 'In Transit',
    estimatedDelivery: '2024-08-12',
    currentLocation: 'Mumbai Distribution Center',
    trackingSteps: [
      {
        id: 1,
        title: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared',
        timestamp: '2024-08-08 10:30 AM',
        completed: true,
        icon: FaCheckCircle
      },
      {
        id: 2,
        title: 'Order Packed',
        description: 'Your items have been carefully packed and labeled',
        timestamp: '2024-08-08 2:15 PM',
        completed: true,
        icon: FaBox
      },
      {
        id: 3,
        title: 'Shipped',
        description: 'Your order is on its way to the delivery hub',
        timestamp: '2024-08-09 9:00 AM',
        completed: true,
        icon: FaTruck
      },
      {
        id: 4,
        title: 'In Transit',
        description: 'Package is currently at Mumbai Distribution Center',
        timestamp: '2024-08-10 11:45 AM',
        completed: true,
        current: true,
        icon: FaMapMarkerAlt
      },
      {
        id: 5,
        title: 'Out for Delivery',
        description: 'Your package is out for delivery',
        timestamp: 'Expected: 2024-08-12 9:00 AM',
        completed: false,
        icon: FaTruck
      },
      {
        id: 6,
        title: 'Delivered',
        description: 'Package delivered successfully',
        timestamp: 'Expected: 2024-08-12 6:00 PM',
        completed: false,
        icon: FaCheckCircle
      }
    ],
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        quantity: 1,
        price: 15999,
        image: '/api/placeholder/80/80'
      },
      {
        id: 2,
        name: 'Phone Case',
        quantity: 1,
        price: 999,
        image: '/api/placeholder/80/80'
      }
    ],
    deliveryAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      pincode: '400001',
      phone: '+91 98765 43210'
    },
    carrier: {
      name: 'Premium Express',
      phone: '+91 1800-123-456',
      trackingUrl: 'https://premiumexpress.com/track'
    }
  };

  const buildTrackingSteps = (status) => {
    const base = [
      { id: 1, title: 'Order Confirmed', description: 'We received your order', timestamp: new Date().toLocaleString(), completed: true, icon: FaCheckCircle },
      { id: 2, title: 'Order Packed', description: 'Items are packed securely', timestamp: new Date().toLocaleString(), completed: true, icon: FaBox },
      { id: 3, title: 'Shipped', description: 'Handed to the carrier', timestamp: new Date().toLocaleString(), completed: true, icon: FaTruck },
      { id: 4, title: 'In Transit', description: 'On the way to your city', timestamp: new Date().toLocaleString(), completed: status?.toLowerCase?.() !== 'delivered', current: status?.toLowerCase?.() !== 'delivered', icon: FaMapMarkerAlt },
      { id: 5, title: 'Delivered', description: 'Package delivered successfully', timestamp: 'ETA soon', completed: status?.toLowerCase?.() === 'delivered', icon: FaCheckCircle }
    ];
    return base;
  };

  const trackOrder = () => {
    setError('');
    setLoading(true);

    setTimeout(() => {
      const found = (orders || []).find(o => String(o.id) === String(trackingId));
      if (!found) {
        setOrderData(null);
        setLoading(false);
        setError('Invalid Order ID. Please enter an Order ID from your My Orders.');
        return;
      }

      // Map order from context into the tracking view shape
      const items = (found.items && found.items.length ? found.items : (found.product ? [{
        id: found.product.id || 1,
        name: found.product.title || found.product.name || 'Product',
        quantity: found.product.quantity || 1,
        price: found.product.price || found.total || 0,
        image: found.product.image || '/api/placeholder/80/80'
      }] : []));

      const est = new Date(found.createdAt || Date.now());
      est.setDate(est.getDate() + 3);

      const normalized = {
        orderId: String(found.id),
        status: found.status || 'Processing',
        estimatedDelivery: est.toISOString().slice(0,10),
        currentLocation: found.city || 'Processing Center',
        trackingSteps: buildTrackingSteps(found.status),
        items,
        deliveryAddress: {
          name: found.customerName || 'Customer',
          address: found.address || '—',
          city: found.city || '—',
          pincode: found.pincode || '—',
          phone: found.phone || found.userPhone || '—'
        },
        carrier: {
          name: 'Premium Express',
          phone: '+91 1800-123-456',
          trackingUrl: 'https://premiumexpress.com/track'
        },
        total: found.total
      };

      setOrderData(normalized);
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    if (routeOrderId) {
      setTrackingId(routeOrderId);
      trackOrder();
    }
  }, [routeOrderId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Confirmed': return 'text-blue-600';
      case 'Order Packed': return 'text-purple-600';
      case 'Shipped': return 'text-orange-600';
      case 'In Transit': return 'text-yellow-600';
      case 'Out for Delivery': return 'text-green-600';
      case 'Delivered': return 'text-green-700';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="my-12 p-8 bg-white dark:bg-dark-surface rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
            Tracking your order...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="my-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <FaBox />
          Real-Time Order Tracking
        </h2>
        
        {/* Tracking Input */}
        <div className="flex gap-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter your order ID"
            className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            onClick={trackOrder}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Track Order
          </button>
        </div>
        {error && (
          <div className="mt-3 text-sm bg-red-50 text-red-700 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {orderData && (
        <div className="bg-white dark:bg-dark-surface rounded-b-2xl shadow-lg overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Order ID
                </h3>
                <p className="text-primary dark:text-dark-primary font-mono">
                  {orderData.orderId}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Current Status
                </h3>
                <p className={`font-semibold ${getStatusColor(orderData.status)}`}>
                  {orderData.status}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Estimated Delivery
                </h3>
                <p className="text-green-600 font-semibold flex items-center gap-2">
                  <FaClock className="text-sm" />
                  {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
              Tracking Timeline
            </h3>
            
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {orderData.trackingSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative flex items-start gap-6 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Step Icon */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white text-xl ${
                    step.completed 
                      ? step.current 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse' 
                        : 'bg-green-500'
                      : 'bg-gray-300'
                  }`}>
                    <step.icon />
                    {step.current && (
                      <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className={`p-4 rounded-xl ${
                      step.current 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                        : step.completed 
                          ? 'bg-green-50 dark:bg-green-900/20' 
                          : 'bg-gray-50 dark:bg-gray-800'
                    }`}>
                      <h4 className={`font-semibold mb-1 ${
                        step.current ? 'text-blue-700 dark:text-blue-300' : 'text-text-primary dark:text-dark-text-primary'
                      }`}>
                        {step.title}
                        {step.current && (
                          <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-2">
                        {step.description}
                      </p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        {step.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Order Total
            </h3>
            {(() => {
              const computedSubtotal = orderData.items?.reduce((s, it) => s + (it.price * (it.quantity || 1)), 0) || 0;
              const tax = Math.round(computedSubtotal * 0.18);
              const total = typeof orderData.total === 'number' ? orderData.total : (computedSubtotal + tax);
              return (
                <div className="max-w-md space-y-3">
                  <div className="flex justify-between text-sm text-text-secondary dark:text-dark-text-secondary">
                    <span>Subtotal</span>
                    <span>₹{computedSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary dark:text-dark-text-secondary">
                    <span>Tax (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Delivery Info */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Delivery Address */}
              <div>
                <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Delivery Address
                </h3>
                <div className="text-text-secondary dark:text-dark-text-secondary">
                  <p className="font-semibold">{orderData.deliveryAddress.name}</p>
                  <p>{orderData.deliveryAddress.address}</p>
                  <p>{orderData.deliveryAddress.city} - {orderData.deliveryAddress.pincode}</p>
                  <p className="flex items-center gap-2 mt-2">
                    <FaPhone className="text-sm" />
                    {orderData.deliveryAddress.phone}
                  </p>
                </div>
              </div>

              {/* Carrier Info */}
              <div>
                <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-3 flex items-center gap-2">
                  <FaTruck />
                  Carrier Information
                </h3>
                <div className="text-text-secondary dark:text-dark-text-secondary">
                  <p className="font-semibold">{orderData.carrier.name}</p>
                  <p className="flex items-center gap-2 mt-2">
                    <FaPhone className="text-sm" />
                    {orderData.carrier.phone}
                  </p>
                  <a 
                    href={orderData.carrier.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-700 underline"
                  >
                    Track on carrier website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 items-center relative">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Support
              </button>
              <button
                onClick={() => handleDownloadInvoice(orderData)}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-primary dark:text-dark-text-primary px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Download Invoice
              </button>
              <button
                onClick={() => {
                  if (!orderData) return;
                  const text = getShareText(orderData);
                  const shareData = { title: `Order ${orderData.orderId}`, text, url: orderData.carrier.trackingUrl || window.location.href };
                  if (navigator.share) {
                    navigator.share(shareData).catch(() => {});
                  } else {
                    setShowShare(true);
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Share Tracking
              </button>

              {/* Fallback Share Sheet */}
              {showShare && (
                <div className="absolute top-full mt-3 left-0 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 flex gap-3 z-10">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(getShareText(orderData))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md bg-green-100 text-green-800 text-sm font-medium"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent('Order Tracking ' + orderData.orderId)}&body=${encodeURIComponent(getShareText(orderData))}`}
                    className="px-3 py-2 rounded-md bg-blue-100 text-blue-800 text-sm font-medium"
                  >
                    Email
                  </a>
                  <button
                    onClick={() => copyShareText(orderData)}
                    className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm font-medium"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => setShowShare(false)}
                    className="px-3 py-2 rounded-md bg-red-100 text-red-700 text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Helpers: invoice & sharing
function handleDownloadInvoice(orderData) {
  if (!orderData) return;

  const purchaseDate = derivePurchaseDate(orderData) || new Date().toISOString();
  const warrantyMonths = 12;
  const warrantyUntil = new Date(new Date(purchaseDate).setMonth(new Date(purchaseDate).getMonth() + warrantyMonths))
    .toISOString()
    .slice(0, 10);

  const itemsRows = orderData.items
    .map(
      (it) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(it.name)}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${it.quantity}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">₹${Number(it.price).toLocaleString()}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">₹${Number(it.price * it.quantity).toLocaleString()}</td>
        </tr>`
    )
    .join('');

  const subtotal = orderData.items.reduce((s, it) => s + it.price * it.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice ${orderData.orderId}</title>
        <style>
          :root{
            --primary:#111827; /* slate-900 */
            --accent:#111827;
            --muted:#6b7280; /* gray-500 */
            --border:#e5e7eb; /* gray-200 */
            --soft:#f8fafc; /* slate-50 */
            --brand:#111827;
          }
          *{box-sizing:border-box}
          body { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 32px; color: var(--primary); background:#fff; }
          .wrap { max-width: 900px; margin: 0 auto; border: 1px solid var(--border); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,.06); }
          .brand { display:flex; align-items:center; justify-content:space-between; padding: 24px 28px; background: linear-gradient(135deg,#0ea5e9,#8b5cf6); color:#fff; }
          .brand-left { display:flex; align-items:center; gap:14px }
          .logo { width:44px;height:44px;border-radius:10px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-weight:800 }
          .brand-title { font-size:20px; font-weight:800; letter-spacing:.3px }
          .inv-meta { text-align:right; font-size:12px; opacity:.95 }
          .section { padding: 24px 28px; }
          .grid-2 { display:grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .card { background: var(--soft); border:1px solid var(--border); border-radius: 14px; padding:16px; }
          h3 { margin:0 0 10px 0; font-size:14px; text-transform:uppercase; letter-spacing:.6px; color:#111827 }
          .muted { color: var(--muted); }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; }
          th, td { padding: 12px; border: 1px solid var(--border); text-align:left }
          th { background:#f3f4f6; font-weight:700 }
          .totals { margin-top: 16px; display:grid; grid-template-columns:1fr 260px; gap:20px; align-items:start }
          .summary { border:1px solid var(--border); border-radius:14px; padding:16px; background:#fff }
          .summary-row { display:flex; justify-content:space-between; margin:8px 0; color: var(--muted) }
          .summary-row.total { color:#111827; font-weight:800; font-size:18px; margin-top:12px; padding-top:10px; border-top:1px dashed var(--border) }
          .footer { padding: 18px 28px 26px; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
          .badge { display:inline-block; padding:6px 10px; background:#eef2ff; color:#4338ca; border-radius:999px; font-weight:700; letter-spacing:.3px }
          .small { font-size: 12px }
          .print { padding:10px 16px;border-radius:10px;background:#111827;color:white;border:none;font-weight:700; }
          @media print { .print { display:none } .wrap { box-shadow:none } body { padding:0 } }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="brand">
            <div class="brand-left">
              <div class="logo">RS</div>
              <div>
                <div class="brand-title">Redstores</div>
                <div class="small" style="opacity:.85">Premium Electronics & Lifestyle</div>
              </div>
            </div>
            <div class="inv-meta">
              <div><strong>INVOICE</strong></div>
              <div>Order ID: ${orderData.orderId}</div>
              <div>Date: ${new Date(purchaseDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div class="section grid-2">
            <div class="card">
              <h3>Bill To</h3>
              <div><strong>${escapeHtml(orderData.deliveryAddress.name)}</strong></div>
              <div class="muted">${escapeHtml(orderData.deliveryAddress.address)}</div>
              <div class="muted">${escapeHtml(orderData.deliveryAddress.city)} - ${escapeHtml(orderData.deliveryAddress.pincode)}</div>
              <div class="muted">${escapeHtml(orderData.deliveryAddress.phone)}</div>
            </div>
            <div class="card">
              <h3>Order Details</h3>
              <div class="muted">Carrier</div>
              <div><strong>${escapeHtml(orderData.carrier.name)}</strong></div>
              <div class="muted" style="margin-top:6px">Warranty</div>
              <div><span class="badge">${warrantyMonths} Months</span> &nbsp;valid until&nbsp; <strong>${new Date(warrantyUntil).toLocaleDateString()}</strong></div>
            </div>
          </div>

          <div class="section">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>

            <div class="totals">
              <div></div>
              <div class="summary">
                <div class="summary-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
                <div class="summary-row"><span>Tax (18%)</span><span>₹${tax.toLocaleString()}</span></div>
                <div class="summary-row total"><span>Total</span><span>₹${total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div class="small muted">This is a computer generated invoice. For support contact ${escapeHtml(orderData.carrier.phone)}.<br/>Thank you for shopping with Redstores.</div>
            <button class="print" onclick="window.print()">Print / Save PDF</button>
          </div>
        </div>
      </body>
    </html>
  `;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
}

// handleShareTracking removed — logic handled inline inside component

function getShareText(orderData) {
  return `Tracking Update for ${orderData.orderId}\nStatus: ${orderData.status}\nETA: ${orderData.estimatedDelivery}\nCarrier: ${orderData.carrier.name}\nTrack Here: ${orderData.carrier.trackingUrl}`;
}

function copyShareText(orderData) {
  const text = getShareText(orderData);
  navigator.clipboard?.writeText(text);
  alert('Tracking details copied to clipboard');
}

function derivePurchaseDate(orderData) {
  const first = orderData?.trackingSteps?.[0]?.timestamp;
  return first || orderData?.estimatedDelivery; // fallback
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default OrderTracking;
