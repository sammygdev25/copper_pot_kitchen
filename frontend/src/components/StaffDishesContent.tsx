import type { Dish } from '../types';
import { SkeletonCards, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import StaffDishList from './StaffDishList';

interface StaffDishesContentProps {
  dishes: Dish[];
  loading: boolean;
  onEdit: (dish: Dish) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
}

export default function StaffDishesContent({ dishes, loading, onEdit, onDelete, onAddNew }: StaffDishesContentProps) {
  if (loading) {
    return <SkeletonCards count={6} />;
  }

  if (!dishes || dishes.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No dishes on the menu yet"
        text="Add your first dish so diners can start browsing and ordering from your menu."
        action={
          <button className="btn btn-primary" onClick={onAddNew}>
            <Icon name="plus" size={16} /> Add Dish
          </button>
        }
      />
    );
  }

  return <StaffDishList dishes={dishes} onEdit={onEdit} onDelete={onDelete} />;
}