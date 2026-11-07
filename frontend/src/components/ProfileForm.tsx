import React, { useState } from 'react';

interface ProfileFormProps {
  user: any;
  onSave: (data: { username: string; email: string }) => void | Promise<void>;
}

export default function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !email.trim()) {
      setError('Username and email are required.');
      return;
    }
    setSaving(true);
    try {
      await onSave({ username: username.trim(), email: email.trim() });
    } catch (err: any) {
      setError(err?.message || 'Could not save your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && <div className="ds-alert" role="alert">{error}</div>}

      <div className="ds-field">
        <label className="ds-label" htmlFor="profile-username">Username</label>
        <input
          id="profile-username"
          className="input"
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder="Your display name"
          required
        />
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="profile-email">Email</label>
        <input
          id="profile-email"
          className="input"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="ds-form-actions">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}