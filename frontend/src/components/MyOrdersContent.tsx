import { Section, Grid, EmptyState, Button } from '../components/ui';
import OrderCard from './OrderCard';
import type { Order } from '../types';

interface MyOrdersContentProps {
  orders: Order[];
  loading?: boolean;
}

export default function MyOrdersContent({ orders, loading = false }: MyOrdersContentProps) {
  if (loading) {
    return (
      <Section tight>
        <div className="ds-loading">Loading your orders...</div>
      </Section>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Section tight>
        <EmptyState
          icon="package"
          title="No orders yet"
          text="Once you place an order from our menu it will show up here with live status updates."
          action={
            <Button variant="primary" to="/dishes">
              Browse the Menu
            </Button>
          }
        />
      </Section>
    );
  }

  return (
    <Section tight>
      <Grid size="md" cols={3}>
        {(Array.isArray(orders) ? orders : []).map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Grid>
    </Section>
  );
}