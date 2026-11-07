import React from 'react';
import { Section, Card, CardBody, Badge, EmptyState, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Order } from '../types';

interface StaffOrdersContentProps {
  orders: Order[];
  onStatusChange: (orderId: number, status: string) => void;
  loading?: boolean;
}

const STATUS_FLOW: Record<string, string> = {
  placed: 'preparing',
  preparing: 'ready',
  ready: 'completed',
  completed: 'completed',
};

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  placed: 'neutral',
  preparing: 'primary',
  ready: 'soft',
  completed: 'success',
};

const STATUS_LABEL: Record<string, string> = {
  placed: 'Placed',
  preparing: 'Preparing',
  ready: 'Ready',
  completed: 'Completed',
};

export default function StaffOrdersContent({ orders, onStatusChange, loading }: StaffOrdersContentProps) {
  if (!loading && orders.length === 0) {
    return (
      <Section title="Orders" eyebrow="Kitchen queue">
        <EmptyState
          icon="package"
          title="No orders yet"
          text="Once customers place orders from the menu, they will show up here for the kitchen to manage."
          action={<Button to="/staff/dishes" variant="primary">Manage dishes</Button>}
        />
      </Section>
    );
  }

  return (
    <Section title="Orders" eyebrow="Kitchen queue" tight>
      <div className="ds-table-wrap">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(orders) ? orders : []).map((order) => {
              const next = STATUS_FLOW[order.status];
              const isFinal = order.status === 'completed';
              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>${Number(order.total_amount).toFixed(2)}</td>
                  <td>
                    <Badge tone={order.is_paid ? 'success' : 'danger'}>
                      {order.is_paid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </td>
                  <td>
                    <Badge tone={STATUS_TONE[order.status] || 'neutral'}>
                      {STATUS_LABEL[order.status] || order.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      size="md"
                      disabled={isFinal}
                      onClick={() => onStatusChange(order.id, next)}
                    >
                      <Icon name="arrow-right" size={16} />
                      {isFinal ? 'Done' : `Mark ${STATUS_LABEL[next]}`}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
