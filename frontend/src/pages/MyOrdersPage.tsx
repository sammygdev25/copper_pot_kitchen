import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getOrderList } from '../api';
import type { Order } from '../types';
import MyOrdersHeader from '../components/MyOrdersHeader';
import MyOrdersContent from '../components/MyOrdersContent';
import MyOrdersDetails from '../components/MyOrdersDetails';

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    async function loadOrders() {
      setLoading(true);
      try {
        const data = await getOrderList();
        if (active) {
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setOrders([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadOrders();
    return () => {
      active = false;
    };
  }, []);

  const userName = user?.username || user?.email || 'Guest';

  return (
    <div className="ds-stack-lg">
      <MyOrdersHeader userName={userName} />
      <MyOrdersContent orders={orders} loading={loading} />
      <MyOrdersDetails user={user} />
    </div>
  );
}