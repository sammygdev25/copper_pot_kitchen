import { PageHeader } from '../components/ui';

interface DishListHeaderProps {
  resultCount?: number;
  loading?: boolean;
}

export default function DishListHeader({ resultCount, loading }: DishListHeaderProps) {
  const subtitle =
    loading || resultCount === undefined
      ? 'Fresh dishes made to order, from starters to dessert.'
      : `${resultCount} dish${resultCount === 1 ? '' : 'es'} ready for your next order.`;

  return (
    <PageHeader
      eyebrow="Our Menu"
      title="Browse the Full Menu"
      subtitle={subtitle}
    />
  );
}