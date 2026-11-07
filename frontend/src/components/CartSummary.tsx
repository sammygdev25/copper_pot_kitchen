import React from 'react';
import { Card, CardBody, Price, Button, Stack } from '../components/ui';
import { Icon } from '../components/icons';

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ total, onCheckout }: CartSummaryProps) {
  const deliveryFee = total > 0 ? 3.5 : 0;
  const grandTotal = total + deliveryFee;

  return (
    <Card>
      <CardBody>
        <Stack gap="md">
          <h3 className="ds-card-title">Order Summary</h3>
          <div className="ds-between">
            <span className="ds-muted">Subtotal</span>
            <Price value={total} />
          </div>
          <div className="ds-between">
            <span className="ds-muted">Delivery fee</span>
            <Price value={deliveryFee} />
          </div>
          <div className="ds-between">
            <span className="ds-card-title">Total</span>
            <Price value={grandTotal} />
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={onCheckout}
            disabled={total <= 0}
          >
            <Icon name="credit-card" size={18} />
            Proceed to Checkout
          </Button>
          <p className="ds-small ds-muted">
            Taxes calculated at checkout. Pay securely with Stripe once your order is placed.
          </p>
        </Stack>
      </CardBody>
    </Card>
  );
}