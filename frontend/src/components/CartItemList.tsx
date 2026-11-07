import React from 'react';
import { CartItem } from '../contexts/CartContext';
import { Media, Button, Stack } from '../components/ui';
import { Icon } from '../components/icons';
import { formatCurrency } from '../utils';

interface CartItemListProps {
  items: CartItem[];
  onUpdateQuantity: (dishId: number, quantity: number) => void;
  onRemove: (dishId: number) => void;
}

export default function CartItemList({ items, onUpdateQuantity, onRemove }: CartItemListProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <ul className="ds-stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item) => (
        <li key={item.dish.id} className="ds-card" style={{ padding: 'var(--space-md)' }}>
          <div className="ds-cluster" style={{ alignItems: 'center', gap: 'var(--space-md)' }}>
            <Media
              src={item.dish.photo || ''}
              alt={item.dish.name}
              ratio="square"
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 className="ds-card-title" style={{ marginBottom: 'var(--space-xs)' }}>
                {item.dish.name}
              </h3>
              <p className="ds-muted ds-small" style={{ margin: 0 }}>
                {formatCurrency(Number(item.dish.price))} each
              </p>
            </div>
            <Stack gap="xs" align="center">
              <Button
                variant="ghost"
                aria-label={`Decrease quantity of ${item.dish.name}`}
                onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
              >
                <Icon name="minus" size={16} />
              </Button>
              <span className="ds-small" style={{ minWidth: '1.5rem', textAlign: 'center' }}>
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                aria-label={`Increase quantity of ${item.dish.name}`}
                onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
              >
                <Icon name="plus" size={16} />
              </Button>
            </Stack>
            <div className="ds-price" style={{ minWidth: '5rem', textAlign: 'right' }}>
              {formatCurrency(Number(item.dish.price) * item.quantity)}
            </div>
            <Button
              variant="ghost"
              aria-label={`Remove ${item.dish.name} from cart`}
              onClick={() => onRemove(item.dish.id)}
            >
              <Icon name="trash" size={16} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}