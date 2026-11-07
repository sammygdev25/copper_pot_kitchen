import { Section } from '../components/ui';
import { Icon } from '../components/icons';

interface StaffOrdersDetailsProps {
  staffName: string;
  staffEmail: string;
  role: string;
  totalOrders: number;
  pendingOrders: number;
}

export default function StaffOrdersDetails({
  staffName,
  staffEmail,
  role,
  totalOrders,
  pendingOrders,
}: StaffOrdersDetailsProps) {
  return (
    <Section narrow eyebrow="Account" title="Staff account details">
      <div className="ds-form">
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="user" size={16} /> Staff member
          </span>
          <p className="ds-help">{staffName}</p>
        </div>
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="mail" size={16} /> Email
          </span>
          <p className="ds-help">{staffEmail}</p>
        </div>
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="shield" size={16} /> Role
          </span>
          <p className="ds-help">{role === 'staff' ? 'Kitchen & front-of-house staff' : role}</p>
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="package" size={16} /> Orders handled
            </span>
            <p className="ds-help">{totalOrders} orders processed through the kitchen</p>
          </div>
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="clock" size={16} /> Awaiting action
            </span>
            <p className="ds-help">{pendingOrders} orders still placed or preparing</p>
          </div>
        </div>
      </div>
    </Section>
  );
}