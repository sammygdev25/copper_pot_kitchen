import { PageHeader, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface StaffCategoriesHeaderProps {
  onAddCategory: () => void;
}

export default function StaffCategoriesHeader({ onAddCategory }: StaffCategoriesHeaderProps) {
  return (
    <PageHeader
      eyebrow="Staff dashboard"
      title="Menu categories"
      subtitle="Organize your menu into categories like Starters, Mains, Desserts and Drinks so diners can browse with ease."
      actions={
        <Button variant="primary" onClick={onAddCategory}>
          <Icon name="plus" size={18} />
          New Category
        </Button>
      }
    />
  );
}