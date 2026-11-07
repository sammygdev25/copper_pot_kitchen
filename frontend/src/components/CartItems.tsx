import { Section, WithSidebar, Stack, Media, Button, Price, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import type { Dish } from '../types';

export interface CartLineItem {
  dish: Dish;
  quantity: number;
}

interface CartItemsProps {
  items: CartLineItem[];
  onUpdateQuantity: (dishId: number, quantity: number) => void;
  onRemove: (dishId: number) => void;
  sidebar?: React.ReactNode;
}

export default function CartItems({ items, onUpdateQuantity, onRemove, sidebar }: CartItemsProps) {
  if (!items || items.length === 0) {
    return (
      <Section title="Your cart" tight>
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          text="Browse the menu and add a few dishes to get your order started."
          action={<Button to="/dishes" variant="primary">Browse the menu</Button>}
        />
      </Section>
    );
  }

  return (
    <Section title="Your cart" tight>
      <WithSidebar sidebar={sidebar}>
        <Stack gap="md">
          {(Array.isArray(items) ? items : []).map((item) => (
            <div key={item.dish.id} className="ds-table-wrap">
              <Stack gap="md" align="center" justify="between">
                <Stack gap="sm" align="center">
                  <Media
                    src={item.dish.photo || ''}
                    alt={item.dish.name}
                    ratio="square"
                  />
                  <div>
                    <div className="ds-card-title">{item.dish.name}</div>
                    <div className="ds-card-meta">
                      <Price value={item.dish.price} />
                    </div>
                  </div>
                </Stack>
                <Stack gap="sm" align="center">
                  <Button
                    variant="ghost"
                    size="md"
                    aria-label={`Decrease quantity of ${item.dish.name}`}
                    onClick={() => onUpdateQuantity(item.dish.id, Math.max(1, item.quantity - 1))}
                  >
                    <Icon name="minus" />
                  </Button>
                  <span className="ds-small">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="md"
                    aria-label={`Increase quantity of ${item.dish.name}`}
                    onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                  >
                    <Icon name="plus" />
                  </Button>
                </Stack>
                <Price value={Number(item.dish.price) * item.quantity} />
                <Button
                  variant="danger"
                  size="md"
                  aria-label={`Remove ${item.dish.name} from cart`}
                  onClick={() => onRemove(item.dish.id)}
                >
                  <Icon name="trash" />
                </Button>
              </Stack>
            </div>
          ))}
        </Stack>
      </WithSidebar>
    </Section>
  );
}