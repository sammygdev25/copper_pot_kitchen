import React from 'react';
import { Card, CardBody, CardTitle, CardMeta, Stack, Badge } from './ui';
import { Icon } from './icons';

interface ProfileInfoCardUser {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
  created_at?: string;
}

interface ProfileInfoCardProps {
  user: ProfileInfoCardUser;
}

function formatJoinDate(dateStr?: string): string {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  const initials = (user.username || 'U').slice(0, 2).toUpperCase();
  const isStaff = user.role === 'staff';

  return (
    <Card>
      <CardBody>
        <Stack gap="md" align="center">
          <div className="ds-avatar" aria-hidden="true">
            {initials}
          </div>
          <Stack gap="xs" align="center">
            <CardTitle>{user.username || 'Guest'}</CardTitle>
            <CardMeta>
              <Icon name="mail" size={14} /> {user.email || 'No email on file'}
            </CardMeta>
          </Stack>
          <Stack gap="sm" align="center" justify="center">
            <Badge tone={isStaff ? 'primary' : 'soft'}>
              {isStaff ? 'Staff' : 'Customer'}
            </Badge>
            <CardMeta>
              <Icon name="calendar" size={14} /> Member since {formatJoinDate(user.created_at)}
            </CardMeta>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ProfileInfoCard;