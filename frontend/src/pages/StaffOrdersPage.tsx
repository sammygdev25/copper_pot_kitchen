import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getOrderList, updateOrder } from '../api';
import type { Order } from '../types';
import StaffOrdersHeader from '../components/StaffOrdersHeader';
import StaffOrdersContent from '../components/StaffOrdersContent';
import StaffOrdersDetails from '../components/StaffOrdersDetails';
import { Alert } from '../components/ui';

export default function StaffOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getOrderList();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Unable to load orders right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (orderId: number, status: string) => {
    const previous = orders;
    setOrders((current) =>
      current.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    try {
      await updateOrder(orderId, { status });
    } catch (err) {
      setOrders(previous);
      setError('Could not update that order. Please try again.');
    }
  };

  const userName = user?.username || user?.email || 'Staff member';
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === 'placed' || o.status === 'preparing'
  ).length;
  const userRole = typeof user?.role === 'string' ? user.role : 'staff';

  return (
    <div className="ds-stack-lg">
      <StaffOrdersHeader userName={userName} />

      {error && <Alert tone="danger">{error}</Alert>}

      <StaffOrdersContent
        orders={orders}
        onStatusChange={handleStatusChange}
        loading={loading}
      />

      <StaffOrdersDetails
        staffName={userName}
        staffEmail={user?.email || ''}
        role={userRole}
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
      />
    </div>
  );
}
