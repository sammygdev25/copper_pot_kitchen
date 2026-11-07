import { Grid, Stat } from '../components/ui';

export interface StaffDashboardStatsData {
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  completedOrders: number;
}

interface StaffDashboardStatsProps {
  stats: StaffDashboardStatsData;
}

export default function StaffDashboardStats({ stats }: StaffDashboardStatsProps) {
  const {
    totalOrders = 0,
    totalRevenue = 0,
    activeOrders = 0,
    completedOrders = 0,
  } = stats || ({} as StaffDashboardStatsData);

  return (
    <Grid size="sm" cols={4}>
      <Stat
        value={totalOrders}
        label="Total Orders"
        icon="package"
      />
      <Stat
        value={`$${Number(totalRevenue).toFixed(2)}`}
        label="Revenue"
        icon="dollar"
      />
      <Stat
        value={activeOrders}
        label="In the Kitchen"
        icon="clock"
      />
      <Stat
        value={completedOrders}
        label="Completed"
        icon="check"
      />
    </Grid>
  );
}
