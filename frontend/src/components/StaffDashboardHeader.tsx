import { PageHeader, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface StaffDashboardHeaderProps {
  userName: string;
  onRefresh?: () => void;
}

export default function StaffDashboardHeader({ userName, onRefresh }: StaffDashboardHeaderProps) {
  return (
    <PageHeader
      eyebrow="Staff Dashboard"
      title={`Welcome back, ${userName}`}
      subtitle="Here's how the kitchen and front-of-house are running today."
      actions={
        <Button variant="secondary" onClick={onRefresh}>
          <Icon name="refresh" size={18} />
          Refresh Stats
        </Button>
      }
    />
  );
}