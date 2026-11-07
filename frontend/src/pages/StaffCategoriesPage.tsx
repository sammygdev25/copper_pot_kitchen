import { useEffect, useState } from 'react';
import { getCategoryList, createCategory, updateCategory, deleteCategory } from '../api';
import type { Category } from '../types';
import StaffCategoriesHeader from '../components/StaffCategoriesHeader';
import StaffCategoriesContent from '../components/StaffCategoriesContent';
import CategoryFormModal from '../components/CategoryFormModal';
import { Alert } from '../components/ui';

export default function StaffCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCategoryList();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddNew = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this category? Dishes in it will also be removed.')) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError('Failed to delete category.');
    }
  };

  const handleSave = async (categoryData: Partial<Category>) => {
    if (editingCategory) {
      const updated = await updateCategory(editingCategory.id, categoryData);
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } else {
      const created = await createCategory(categoryData);
      setCategories((prev) => [...prev, created]);
    }
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="ds-stack-lg">
      <StaffCategoriesHeader onAddCategory={handleAddNew} />
      {error && <Alert tone="danger">{error}</Alert>}
      <StaffCategoriesContent
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
      {showModal && (
        <CategoryFormModal
          category={editingCategory}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
