import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getOrderList, getDashboardStats } from '../api';
import type { Order } from '../types';
import type { StaffDashboardStatsData } from '../components/StaffDashboardStats.tsx';
import StaffDashboardHeader from '../components/StaffDashboardHeader';
import StaffDashboardStats from '../components/StaffDashboardStats';
import StaffDashboardRecent from '../components/StaffDashboardRecent';
import StaffDashboardActions from '../components/StaffDashboardActions';
import { Alert, LoadingBlock } from '../components/ui';

export default function StaffDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<StaffDashboardStatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [orderList, statsRes] = await Promise.all([
        getOrderList(),
        getDashboardStats(),
      ]);
      const safeOrders = Array.isArray(orderList) ? orderList : [];
      setOrders(safeOrders.slice(0, 8));
      const statsData = statsRes.data;
      setStats({
        totalOrders: statsData.total_orders ?? 0,
        totalRevenue: statsData.total_revenue ?? 0,
        activeOrders: statsData.pending_orders ?? 0,
        completedOrders: statsData.completed_orders ?? 0,
      });
    } catch (err) {
      setError('Could not load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const defaultStats: StaffDashboardStatsData = {
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    completedOrders: 0,
  };

  return (
    <div className="ds-stack-lg">
      <StaffDashboardHeader
        userName={user?.username || 'Team'}
        onRefresh={loadData}
      />

      {error && <Alert tone="danger">{error}</Alert>}

      {loading ? (
        <LoadingBlock label="Loading dashboard..." />
      ) : (
        <>
          <StaffDashboardStats stats={stats || defaultStats} />
          <StaffDashboardRecent orders={orders} />
        </>
      )}

      <StaffDashboardActions
        onViewOrders={() => navigate('/staff/orders')}
        onManageDishes={() => navigate('/staff/dishes')}
        onManageCategories={() => navigate('/staff/categories')}
      />
    </div>
  );
}
