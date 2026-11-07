import { Section, Grid, Card, CardBody, CardTitle, CardMeta, CardFooter, Media, Price, Badge, Button, SkeletonCards, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import type { Dish } from '../types';

interface DishListGridProps {
  dishes: Dish[];
  loading: boolean;
  onAddToCart: (dish: Dish) => void;
  onClearFilters?: () => void;
}

export default function DishListGrid({ dishes, loading, onAddToCart, onClearFilters }: DishListGridProps) {
  if (loading) {
    return (
      <Section tight>
        <SkeletonCards count={8} />
      </Section>
    );
  }

  if (!dishes || dishes.length === 0) {
    return (
      <Section tight>
        <EmptyState
          icon="search"
          title="No dishes match your search"
          text="Try a different category, clear the search box, or check back soon — our kitchen updates the menu often."
          action={
            onClearFilters ? (
              <Button variant="secondary" onClick={onClearFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />
      </Section>
    );
  }

  return (
    <Section tight>
      <Grid size="md" cols={4}>
        {(Array.isArray(dishes) ? dishes : []).map((dish) => (
          <Card key={dish.id}>
            <Media
              src={dish.photo || ''}
              alt={dish.name}
              ratio="square"
              badge={dish.is_spicy ? 'Spicy' : dish.is_vegetarian ? 'Veg' : undefined}
            />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardMeta>{dish.description || 'A kitchen favorite, made fresh to order.'}</CardMeta>
              <div className="ds-cluster">
                {dish.is_vegetarian && <Badge tone="success">Vegetarian</Badge>}
                {dish.is_spicy && <Badge tone="danger">Spicy</Badge>}
              </div>
              <CardFooter>
                <Price value={dish.price} />
                <Button variant="primary" onClick={() => onAddToCart(dish)}>
                  <Icon name="cart" size={16} />
                  Add to cart
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}