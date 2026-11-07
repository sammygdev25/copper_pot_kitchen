import React from 'react';
import { Section, Cluster, Button } from '../components/ui';

interface StaffDashboardActionsProps {
  onViewOrders?: () => void;
  onManageDishes?: () => void;
  onManageCategories?: () => void;
}

export default function StaffDashboardActions({ onViewOrders, onManageDishes, onManageCategories }: StaffDashboardActionsProps) {
  return (
    <Section title="Quick actions" tight>
      <Cluster gap="sm">
        <Button variant="primary" to="/staff/orders" onClick={onViewOrders}>
          View Orders
        </Button>
        <Button variant="secondary" to="/staff/dishes" onClick={onManageDishes}>
          Manage Dishes
        </Button>
        <Button variant="secondary" to="/staff/categories" onClick={onManageCategories}>
          Manage Categories
        </Button>
        <Button variant="ghost" to="/dishes">
          View Menu
        </Button>
        <Button variant="ghost" to="/staff/dashboard">
          Refresh Dashboard
        </Button>
      </Cluster>
    </Section>
  );
}