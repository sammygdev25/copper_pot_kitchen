import type { Dish } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Price, Media, Badge, Button } from './ui';
import { Icon } from './icons';

interface DishCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
}

export default function DishCard({ dish, onAddToCart }: DishCardProps) {
  const categoryName =
    dish.category && typeof dish.category === 'object'
      ? (dish.category as { name?: string }).name
      : undefined;

  return (
    <Card className="dish-card">
      <Media
        src={dish.photo || ''}
        alt={dish.name}
        ratio="wide"
        badge={categoryName}
      />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardMeta>
          {dish.description || 'A house favorite, made fresh to order.'}
        </CardMeta>
        <Stack gap="xs" align="center" justify="start">
          {dish.is_vegetarian && <Badge tone="success">Vegetarian</Badge>}
          {dish.is_spicy && <Badge tone="danger">Spicy</Badge>}
        </Stack>
        <CardFooter>
          <Price value={dish.price} />
          <Button
            variant="primary"
            onClick={() => onAddToCart(dish)}
          >
            <Icon name="cart" size={16} /> Add to cart
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

function Stack({
  children,
  gap,
  align,
  justify,
}: {
  children: React.ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  align?: string;
  justify?: 'start' | 'center' | 'end' | 'between';
}) {
  return (
    <div className={`ds-cluster ds-cluster-${gap || 'sm'}`}>{children}</div>
  );
}