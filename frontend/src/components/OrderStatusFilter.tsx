import { Icon } from '../components/icons';

export interface OrderStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All Orders' },
  { value: 'placed', label: 'Placed' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'ready', label: 'Ready' },
  { value: 'completed', label: 'Completed' },
];

export default function OrderStatusFilter({ value, onChange }: OrderStatusFilterProps) {
  return (
    <div className="ds-filters">
      <div className="ds-field" style={{ maxWidth: '240px' }}>
        <label className="ds-label" htmlFor="order-status-filter">
          <Icon name="filter" size={14} /> Filter by status
        </label>
        <select
          id="order-status-filter"
          className="input"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}