import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { getOrders, placeOrder } from '../services/api';

export const OrdersContext = createContext({
  orders: [],
  addOrder: () => {},
});

export function OrdersProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem('orders');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Hydrate from backend when user is logged in
  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      if (!user) return; // keep local for guests
      try {
        const list = (await getOrders()).data; // [{id, total_amount, created_at}]
        if (!cancelled) {
          // Normalize to existing shape keys
          const normalized = list.map(o => ({
            id: o.id,
            createdAt: o.created_at,
            totalAmount: o.total_amount,
            status: 'Placed',
            userEmail: user.email,
          }));
          setOrders(normalized);
        }
      } catch {}
    }
    hydrate();
    return () => { cancelled = true; };
  }, [user]);

  const addOrder = async (order) => {
    // order: { items: [{ id, quantity, price }], totalAmount } or { total }
    if (user) {
      try {
        const payload = {
          items: (order.items || []).map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })),
          totalAmount: (order.totalAmount ?? order.total ?? 0),
        };
        const { data } = await placeOrder(payload);
        const withMeta = {
          id: data.orderId,
          createdAt: new Date().toISOString(),
          status: 'Placed',
          userEmail: user.email,
          totalAmount: payload.totalAmount,
        };
        setOrders(prev => [withMeta, ...prev]);
        return data;
      } catch (e) {
        // fall back to local if backend fails
        const withMeta = {
          id: `ord_${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'Processing',
          userEmail: user.email,
          totalAmount: (order.totalAmount ?? order.total ?? 0),
        };
        setOrders(prev => [withMeta, ...prev]);
        return { orderId: withMeta.id };
      }
    } else {
      const withMeta = {
        id: `ord_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'Processing',
        userEmail: 'guest',
        totalAmount: (order.totalAmount ?? order.total ?? 0),
      };
      setOrders(prev => [withMeta, ...prev]);
      return { orderId: withMeta.id };
    }
  };

  const value = useMemo(() => ({ orders, addOrder }), [orders]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}
