import type { Dish } from '../types';
import DishCard from './DishCard';
import { Grid } from '../components/ui';
import { EmptyState } from '../components/ui';

interface DishGridProps {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}

export default function DishGrid({ dishes, onAddToCart }: DishGridProps) {
  const list = Array.isArray(dishes) ? dishes : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No dishes found"
        text="Try adjusting your search or filters to find something delicious."
      />
    );
  }

  return (
    <Grid size="md" cols={3}>
      {list.map((dish) => (
        <DishCard key={dish.id} dish={dish} onAddToCart={onAddToCart} />
      ))}
    </Grid>
  );
}