import React from 'react';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: '-name', label: 'Name (Z-A)' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: '-price', label: 'Price (High to Low)' },
  { value: '-created_at', label: 'Newest First' },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="ds-field">
      <label className="ds-label" htmlFor="sort-select">
        Sort by
      </label>
      <select
        id="sort-select"
        className="input"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}