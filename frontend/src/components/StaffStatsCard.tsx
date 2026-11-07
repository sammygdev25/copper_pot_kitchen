import { Stat } from './ui';

interface StaffStatsCardProps {
  label: string;
  value: number;
}

export default function StaffStatsCard({ label, value }: StaffStatsCardProps) {
  return <Stat value={value} label={label} />;
}