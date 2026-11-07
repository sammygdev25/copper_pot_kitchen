import React from 'react';
import { Icon } from '../components/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="ds-field" style={{ position: 'relative' }}>
      <span
        style={{
          position: 'absolute',
          left: 'var(--space-sm)',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon name="search" size={18} title="Search" />
      </span>
      <input
        type="text"
        className="input"
        placeholder="Search dishes by name or description..."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        style={{ paddingLeft: '2.5rem' }}
        aria-label="Search dishes"
      />
    </div>
  );
}