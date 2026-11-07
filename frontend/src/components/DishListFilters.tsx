import React from 'react';
import { Section } from '../components/ui';
type InputProps = { children?: React.ReactNode; className?: string; [prop: string]: unknown };
function Input({ children, className }: InputProps) { return <div className={className}>{children}</div>; }
import { Icon } from '../components/icons';
import type { Category } from '../types';

interface DishListFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  categories: Category[];
}

export default function DishListFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  categories,
}: DishListFiltersProps) {
  return (
    <Section tight>
      <div className="ds-filters">
        <div className="ds-field">
          <label className="ds-label" htmlFor="dish-search">
            Search the menu
          </label>
          <div className="ds-cluster">
            <Icon name="search" size={18} />
            <Input
              id="dish-search"
              type="text"
              placeholder="Search dishes, e.g. tandoori chicken..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="dish-category">
            Category
          </label>
          <select
            id="dish-category"
            className="input"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onCategoryChange(e.target.value)}
          >
            <option value="">All categories</option>
            {(Array.isArray(categories) ? categories : []).map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="dish-sort">
            Sort by
          </label>
          <select
            id="dish-sort"
            className="input"
            value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value)}
          >
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
            <option value="-created_at">Newest first</option>
          </select>
        </div>
      </div>
    </Section>
  );
}