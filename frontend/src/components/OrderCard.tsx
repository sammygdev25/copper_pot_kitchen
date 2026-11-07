import React from 'react';
import type { Order } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, Price } from '../components/ui';
import { Icon } from '../components/icons';

interface OrderCardProps {
  order: Order;
}

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  placed: 'primary',
  preparing: 'soft',
  ready: 'success',
  completed: 'neutral',
};

const STATUS_LABEL: Record<string, string> = {
  placed: 'Placed',
  preparing: 'Preparing',
  ready: 'Ready',
  completed: 'Completed',
};

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function OrderCard({ order }: OrderCardProps) {
  const tone = STATUS_TONE[order.status] || 'neutral';
  const label = STATUS_LABEL[order.status] || order.status;

  return (
    <Card className="order-card">
      <CardBody>
        <div className="ds-between">
          <CardTitle>Order #{order.id}</CardTitle>
          <Badge tone={tone}>{label}</Badge>
        </div>
        <CardMeta>
          <Icon name="calendar" size={14} /> Placed {formatDate(order.created_at)}
        </CardMeta>
        <CardFooter>
          <div className="ds-between">
            <Price value={Number(order.total_amount)} />
            {order.is_paid ? (
              <Badge tone="success">
                <Icon name="check" size={14} /> Paid
              </Badge>
            ) : (
              <Badge tone="danger">
                <Icon name="alert" size={14} /> Unpaid
              </Badge>
            )}
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
