import { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext.jsx';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaClock, FaCheckCircle, FaTruck, FaRupeeSign } from 'react-icons/fa';

export default function Orders() {
  const { orders } = useContext(OrdersContext);

  if (!orders.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <FaBoxOpen className="mx-auto text-5xl text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold mb-2">No Orders Yet</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">When you place an order, it will appear here.</p>
        <Link to="/products" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white font-semibold shadow hover:opacity-95">
          Explore Products
        </Link>
      </div>
    );
  }

  const statusIcon = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'shipped':
        return <FaTruck className="text-blue-500" />;
      case 'processing':
      default:
        return <FaClock className="text-amber-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                {statusIcon(order.status)}
                <div>
                  <div className="font-semibold">Order #{order.id}</div>
                  <div className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-sm"><span className="text-gray-500">Status: </span><span className="font-medium">{order.status}</span></div>
                <div className="text-sm flex items-center gap-1"><FaRupeeSign /> <span className="font-bold">{order.total?.toFixed?.(2) || '—'}</span></div>
                <Link
                  to={`/orders/${order.id}`}
                  className="text-blue-600 hover:underline text-sm whitespace-nowrap"
                >
                  View details →
                </Link>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  {(order.items || [order.product]).filter(Boolean).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white rounded border" />
                      <div className="flex-1">
                        <div className="font-medium line-clamp-2">{item.title}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity || 1}</div>
                      </div>
                      <div className="font-semibold">₹{(item.price * (item.quantity || 1)).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="text-sm"><span className="text-gray-500">Shipping:</span> {order.shippingMethod || order.shipping?.name || 'Standard'}</div>
                  {order.address && (
                    <div className="text-sm text-gray-500">
                      {order.address}
                    </div>
                  )}
                  {order.userEmail && (
                    <div className="text-sm text-gray-500">Email: {order.userEmail}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
