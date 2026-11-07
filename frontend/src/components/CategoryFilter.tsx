import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const list = Array.isArray(categories) ? categories : [];

  return (
    <div className="ds-cluster" role="tablist" aria-label="Filter dishes by category">
      <button
        type="button"
        className={`badge ${selected === '' ? 'badge-primary' : ''}`}
        onClick={() => onSelect('')}
        aria-selected={selected === ''}
      >
        All Dishes
      </button>
      {list.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`badge ${selected === category.slug ? 'badge-primary' : ''}`}
          onClick={() => onSelect(category.slug)}
          aria-selected={selected === category.slug}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}