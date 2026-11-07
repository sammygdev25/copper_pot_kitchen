import React from 'react';
import type { Order, OrderStatus, OrderItem, Dish } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, EmptyState } from './ui';
import { Icon } from './icons';

interface StaffOrderItem extends Omit<OrderItem, 'dish'> {
  dish: Dish;
}

interface StaffOrder extends Order {
  items?: StaffOrderItem[];
}

interface StaffOrderListProps {
  orders: StaffOrder[];
  onStatusChange: (orderId: number, status: OrderStatus) => void;
}

const STATUS_FLOW: OrderStatus[] = ['placed', 'preparing', 'ready', 'completed'];

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  placed: 'primary',
  preparing: 'soft',
  ready: 'success',
  completed: 'neutral',
};

function nextStatus(status: string): OrderStatus | null {
  const idx = STATUS_FLOW.indexOf(status as OrderStatus);
  if (idx === -1 || idx === STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[idx + 1];
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function StaffOrderList({ orders, onStatusChange }: StaffOrderListProps) {
  const list = Array.isArray(orders) ? orders : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No orders found"
        text="Orders will appear here once customers start placing them."
      />
    );
  }

  return (
    <div className="ds-stack">
      {list.map((order) => {
        const upcoming = nextStatus(order.status);
        const items = Array.isArray(order.items) ? order.items : [];
        return (
          <Card key={order.id} className="ds-card">
            <CardBody>
              <div className="ds-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardMeta>
                    Placed {formatDate(order.created_at)} &middot; {items.length}{' '}
                    {items.length === 1 ? 'item' : 'items'}
                  </CardMeta>
                </div>
                <Badge tone={STATUS_TONE[order.status] || 'neutral'}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              <ul className="ds-stack ds-stack-sm">
                {items.map((item: StaffOrderItem) => (
                  <li key={item.id} className="ds-between">
                    <span>
                      {item.quantity} &times; {item.dish?.name || 'Dish'}
                    </span>
                    <span className="ds-muted">${Number(item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <CardFooter>
                <div className="ds-between">
                  <div className="ds-cluster">
                    <Badge tone={order.is_paid ? 'success' : 'danger'}>
                      {order.is_paid ? 'Paid' : 'Unpaid'}
                    </Badge>
                    <span className="ds-price">${Number(order.total_amount).toFixed(2)}</span>
                  </div>
                  {upcoming && (
                    <button
                      className="btn btn-primary"
                      onClick={() => onStatusChange(order.id, upcoming)}
                    >
                      <Icon name="arrow-right" size={16} />
                      Mark as {upcoming.charAt(0).toUpperCase() + upcoming.slice(1)}
                    </button>
                  )}
                </div>
              </CardFooter>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
