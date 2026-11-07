import React, { useState, FormEvent } from 'react';
import { Icon } from '../components/icons';
import type { Category } from '../types';

interface CategoryFormModalProps {
  category: Category | null;
  onSave: (data: Partial<Category>) => void | Promise<void>;
  onClose: () => void;
}

export default function CategoryFormModal({ category, onSave, onClose }: CategoryFormModalProps) {
  const [name, setName] = useState<string>(category?.name || '');
  const [slug, setSlug] = useState<string>(category?.slug || '');
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const payload: Partial<Category> = { name: name.trim() };
      if (slug.trim()) {
        payload.slug = slug.trim();
      }
      await onSave(payload);
    } catch (err) {
      setError('Could not save category. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ds-modal-overlay" onClick={onClose}>
      <div
        className="ds-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={category ? 'Edit category' : 'New category'}
      >
        <div className="ds-between" style={{ marginBottom: 'var(--space-md)' }}>
          <h2 style={{ margin: 0 }}>{category ? 'Edit Category' : 'New Category'}</h2>
          <button type="button" className="ds-btn-ghost" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        {error && <div className="ds-alert ds-alert-danger">{error}</div>}

        <form className="ds-form" onSubmit={handleSubmit}>
          <div className="ds-field">
            <label className="ds-label" htmlFor="category-name">Name</label>
            <input
              id="category-name"
              className="input"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="e.g. Appetizers, Entrees, Desserts"
              required
            />
          </div>

          <div className="ds-field">
            <label className="ds-label" htmlFor="category-slug">Slug (optional)</label>
            <input
              id="category-slug"
              className="input"
              type="text"
              value={slug}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
              placeholder="auto-generated if left blank"
            />
            <p className="ds-help">Used in the menu URL, e.g. /dishes?category=entrees</p>
          </div>

          <div className="ds-form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : category ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}