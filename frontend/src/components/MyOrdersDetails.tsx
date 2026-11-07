import { Section } from '../components/ui';
import { Icon } from '../components/icons';

interface MyOrdersDetailsUser {
  username?: string;
  email?: string;
  role?: string;
  created_at?: string;
}

interface MyOrdersDetailsProps {
  user: MyOrdersDetailsUser | null;
}

export default function MyOrdersDetails({ user }: MyOrdersDetailsProps) {
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  return (
    <Section
      narrow
      eyebrow="Your account"
      title="Account details"
      subtitle="The information tied to your orders and delivery history."
    >
      <div className="ds-form">
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="user" size={16} /> Username
          </span>
          <p>{user?.username || '—'}</p>
        </div>
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="mail" size={16} /> Email
          </span>
          <p>{user?.email || '—'}</p>
        </div>
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="shield" size={16} /> Role
          </span>
          <p className="ds-muted">
            {user?.role === 'staff' ? 'Staff member' : 'Customer'}
          </p>
        </div>
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="calendar" size={16} /> Member since
          </span>
          <p className="ds-muted">{memberSince}</p>
        </div>
      </div>
    </Section>
  );
}