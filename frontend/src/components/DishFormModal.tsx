import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button } from './ui';
import { Icon } from './icons';
import type { Dish, Category } from '../types';

interface DishFormModalProps {
  dish: Dish | null;
  categories: Category[];
  onSave: (data: FormData) => void | Promise<void>;
  onClose: () => void;
}

export default function DishFormModal({ dish, categories, onSave, onClose }: DishFormModalProps) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (dish) {
      setName(dish.name || '');
      setCategoryId(dish.category ? String(dish.category) : '');
      setPrice(dish.price != null ? String(dish.price) : '');
      setDescription(dish.description || '');
      setIsVegetarian(!!dish.is_vegetarian);
      setIsSpicy(!!dish.is_spicy);
    } else {
      setName('');
      setCategoryId(categories.length > 0 ? String(categories[0].id) : '');
      setPrice('');
      setDescription('');
      setIsVegetarian(false);
      setIsSpicy(false);
    }
    setPhotoFile(null);
    setError('');
  }, [dish, categories]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Dish name is required.');
      return;
    }
    if (!categoryId) {
      setError('Please choose a category.');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError('Please enter a valid price.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('category', categoryId);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('is_vegetarian', String(isVegetarian));
    formData.append('is_spicy', String(isSpicy));
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      setSaving(true);
      await onSave(formData);
    } catch (err) {
      setError('Something went wrong while saving the dish.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ds-modal-overlay" onClick={onClose}>
      <div className="ds-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ds-between" style={{ marginBottom: 'var(--space-md)' }}>
          <h2 style={{ margin: 0 }}>{dish ? 'Edit Dish' : 'Add New Dish'}</h2>
          <button className="ds-btn-ghost" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        {error && (
          <div className="ds-alert" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-danger)' }}>
            {error}
          </div>
        )}

        <form className="ds-form" onSubmit={handleSubmit}>
          <div className="ds-field">
            <label className="ds-label" htmlFor="dish-name">Dish name</label>
            <input
              id="dish-name"
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grilled Salmon with Lemon Butter"
            />
          </div>

          <div className="ds-form-row">
            <div className="ds-field">
              <label className="ds-label" htmlFor="dish-category">Category</label>
              <select
                id="dish-category"
                className="input"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select category</option>
                {(Array.isArray(categories) ? categories : []).map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="ds-field">
              <label className="ds-label" htmlFor="dish-price">Price ($)</label>
              <input
                id="dish-price"
                className="input"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="14.99"
              />
            </div>
          </div>

          <div className="ds-field">
            <label className="ds-label" htmlFor="dish-description">Description</label>
            <textarea
              id="dish-description"
              className="input"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the dish, its ingredients and preparation..."
            />
          </div>

          <div className="ds-field">
            <label className="ds-label" htmlFor="dish-photo">Photo</label>
            <input
              id="dish-photo"
              className="input"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <p className="ds-help">Leave empty to keep the current photo.</p>
          </div>

          <div className="ds-cluster">
            <label className="ds-label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
              />
              Vegetarian
            </label>
            <label className="ds-label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <input
                type="checkbox"
                checked={isSpicy}
                onChange={(e) => setIsSpicy(e.target.checked)}
              />
              Spicy
            </label>
          </div>

          <div className="ds-form-actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : dish ? 'Save Changes' : 'Create Dish'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}