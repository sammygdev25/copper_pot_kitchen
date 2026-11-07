import { PageHeader } from '../components/ui';

interface StaffOrdersHeaderProps {
  userName?: string;
}

export default function StaffOrdersHeader({ userName }: StaffOrdersHeaderProps) {
  return (
    <PageHeader
      eyebrow="Staff"
      title="Orders"
      subtitle={
        userName
          ? `Signed in as ${userName} — track and update every order as the kitchen works through it.`
          : 'Track and update every order as the kitchen works through it.'
      }
    />
  );
}