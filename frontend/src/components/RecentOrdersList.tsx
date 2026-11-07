import type { Order } from '../types';
import { Card, CardBody, CardMeta, Badge, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import { formatCurrency, formatDate } from '../utils';

interface RecentOrdersListProps {
  orders: Order[];
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'placed':
      return 'primary';
    case 'preparing':
      return 'soft';
    case 'ready':
      return 'success';
    case 'completed':
      return 'neutral';
    default:
      return 'neutral';
  }
}

export default function RecentOrdersList({ orders }: RecentOrdersListProps) {
  const list = Array.isArray(orders) ? orders : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No recent orders"
        text="New orders placed by customers will show up here as soon as they come in."
      />
    );
  }

  return (
    <div className="ds-stack">
      {list.map((order) => (
        <Card key={order.id}>
          <CardBody>
            <div className="ds-between">
              <div className="ds-cluster">
                <Icon name="package" size={18} />
                <strong>Order #{order.id}</strong>
              </div>
              <Badge tone={statusTone(order.status)}>{order.status}</Badge>
            </div>
            <CardMeta>
              <span>
                <Icon name="clock" size={14} /> {formatDate(order.created_at)}
              </span>
              <span>{formatCurrency(order.total_amount)}</span>
              <span>{order.is_paid ? 'Paid' : 'Unpaid'}</span>
            </CardMeta>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}