import { Link } from 'react-router-dom';
import { Section, EmptyState, Badge, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Order } from '../types';

interface StaffDashboardRecentProps {
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

export default function StaffDashboardRecent({ orders }: StaffDashboardRecentProps) {
  const recent = Array.isArray(orders) ? orders.slice(0, 8) : [];

  return (
    <Section
      eyebrow="Kitchen activity"
      title="Recent orders"
      subtitle="The latest tickets placed by diners, freshest first."
      actions={
        <Button variant="ghost" to="/staff/orders">
          View all orders
        </Button>
      }
    >
      {recent.length === 0 ? (
        <EmptyState
          icon="package"
          title="No orders yet"
          text="New orders placed by customers will show up here as soon as they come in."
          action={<Button variant="primary" to="/dishes">Preview menu</Button>}
        />
      ) : (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Total</th>
                <th>Placed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    <Badge tone={statusTone(order.status)}>{order.status}</Badge>
                  </td>
                  <td>${Number(order.total_amount).toFixed(2)}</td>
                  <td>{new Date(order.created_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}</td>
                  <td>
                    <Link to="/staff/orders" className="ds-small">
                      Manage <Icon name="arrow-right" size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}