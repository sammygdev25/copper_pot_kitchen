import type { Category } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Button, EmptyState, SkeletonCards } from '../components/ui';
import { Icon } from '../components/icons';

interface StaffCategoriesContentProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
}

export default function StaffCategoriesContent({ categories, loading, onEdit, onDelete, onAddNew }: StaffCategoriesContentProps) {
  if (loading) {
    return <SkeletonCards count={6} />;
  }

  if (!categories || categories.length === 0) {
    return (
      <EmptyState
        icon="tag"
        title="No categories yet"
        text="Create categories like Starters, Mains or Desserts to organize your menu for diners."
        action={
          <Button variant="primary" onClick={onAddNew}>
            <Icon name="plus" size={16} />
            Add Category
          </Button>
        }
      />
    );
  }

  return (
    <div className="ds-grid ds-grid-sm">
      {(Array.isArray(categories) ? categories : []).map((category) => (
        <Card key={category.id}>
          <CardBody>
            <CardTitle>{category.name}</CardTitle>
            <CardMeta>
              <Icon name="tag" size={14} /> {category.slug}
            </CardMeta>
          </CardBody>
          <CardFooter>
            <Button variant="ghost" size="md" onClick={() => onEdit(category)}>
              <Icon name="edit" size={16} />
              Edit
            </Button>
            <Button variant="danger" size="md" onClick={() => onDelete(category.id)}>
              <Icon name="trash" size={16} />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}