import { PageHeader, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface StaffDishesHeaderProps {
  dishCount: number;
  onAddDish: () => void;
}

export default function StaffDishesHeader({ dishCount, onAddDish }: StaffDishesHeaderProps) {
  return (
    <PageHeader
      eyebrow="Staff Dashboard"
      title="Manage Dishes"
      subtitle={`${dishCount} ${dishCount === 1 ? 'dish' : 'dishes'} on the menu. Add new items, update prices, or mark dishes vegetarian or spicy.`}
      actions={
        <Button variant="primary" size="lg" onClick={onAddDish}>
          <Icon name="plus" size={18} />
          Add Dish
        </Button>
      }
    />
  );
}