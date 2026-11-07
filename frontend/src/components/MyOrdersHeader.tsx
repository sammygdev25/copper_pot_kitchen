import { PageHeader } from '../components/ui';

interface MyOrdersHeaderProps {
  userName: string;
}

export default function MyOrdersHeader({ userName }: MyOrdersHeaderProps) {
  return (
    <PageHeader
      eyebrow="Your account"
      title="My Orders"
      subtitle={`Order history and live status for ${userName}'s meals from our kitchen.`}
    />
  );
}