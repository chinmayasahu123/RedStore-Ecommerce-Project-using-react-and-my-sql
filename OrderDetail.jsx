import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext.jsx';
import OrderTracking from '../components/ui/OrderTracking';

export default function OrderDetail() {
  const { orderId } = useParams();
  const { orders } = useContext(OrdersContext);
  const order = orders?.find?.((o) => String(o.id) === String(orderId));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative mb-6 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold pr-24 sm:pr-0">Order #{orderId}</h1>
        {/* Desktop/Tablet */}
        <Link
          to="/orders"
          className="hidden sm:inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200"
        >
          ← Back to Orders
        </Link>
        {/* Mobile - pinned top-right */}
        <Link
          to="/orders"
          className="absolute right-0 top-0 inline-flex sm:hidden items-center rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200"
          aria-label="Back to Orders"
        >
          Back
        </Link>
      </div>

      {order ? (
        <div className="mb-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <div className="font-semibold">{order.status || 'Processing'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Placed</div>
              <div className="font-semibold">{new Date(order.createdAt || Date.now()).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-semibold">₹{order.total?.toFixed?.(2) ?? '—'}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-800">
          We couldn't find this order in your session state. You can still view tracking below.
        </div>
      )}

      {/* Tracking with Totals (items list removed inside component) */}
      <OrderTracking />
    </div>
  );
}
