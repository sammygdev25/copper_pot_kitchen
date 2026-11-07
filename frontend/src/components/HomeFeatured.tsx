import { Link } from 'react-router-dom';
import { Section, Grid, Card, CardBody, CardTitle, CardMeta, Price, Media, SkeletonCards, EmptyState, Badge, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Dish } from '../types';

interface HomeFeaturedProps {
  dishes: Dish[];
  loading: boolean;
  onAddToCart?: (dish: Dish) => void;
}

export default function HomeFeatured({ dishes, loading, onAddToCart }: HomeFeaturedProps) {
  return (
    <Section
      eyebrow="From the kitchen"
      title="Featured dishes"
      subtitle="A handful of favorites from our menu, picked fresh for you to try tonight."
      actions={<Button variant="ghost" to="/dishes">View full menu</Button>}
    >
      {loading ? (
        <SkeletonCards count={8} />
      ) : dishes.length === 0 ? (
        <EmptyState
          icon="package"
          title="No dishes yet"
          text="Our menu is being prepared — check back shortly for featured dishes."
          action={<Button variant="primary" to="/dishes">Browse menu</Button>}
        />
      ) : (
        <Grid size="md" cols={4}>
          {dishes.slice(0, 8).map((dish) => (
            <Card key={dish.id} to={`/dishes?category=${dish.category}`}>
              <Media
                src={dish.photo || ''}
                alt={dish.name}
                ratio="square"
                badge={dish.is_spicy ? 'Spicy' : dish.is_vegetarian ? 'Veg' : undefined}
              />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardMeta>{dish.description || 'A house favorite, made to order.'}</CardMeta>
                <div className="ds-between">
                  <Price value={dish.price} />
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart && onAddToCart(dish);
                    }}
                  >
                    <Icon name="cart" size={16} /> Add
                  </Button>
                </div>
                {(dish.is_vegetarian || dish.is_spicy) && (
                  <div className="ds-cluster">
                    {dish.is_vegetarian && <Badge tone="success">Vegetarian</Badge>}
                    {dish.is_spicy && <Badge tone="danger">Spicy</Badge>}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}