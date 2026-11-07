import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StaffDishesHeader from '../components/StaffDishesHeader';
import StaffDishesContent from '../components/StaffDishesContent';
import DishFormModal from '../components/DishFormModal';
import { Alert } from '../components/ui';
import { getDishList, getCategoryList, createDish, updateDish, deleteDish } from '../api';
import type { Dish, Category } from '../types';

function formDataToDishData(data: FormData): Partial<Omit<Dish, 'id'>> {
  const result: Partial<Omit<Dish, 'id'>> = {};
  const name = data.get('name');
  if (typeof name === 'string') result.name = name;
  const category = data.get('category');
  if (typeof category === 'string' && category) result.category = Number(category);
  const price = data.get('price');
  if (typeof price === 'string' && price) result.price = Number(price);
  const description = data.get('description');
  if (typeof description === 'string') result.description = description;
  const isVegetarian = data.get('is_vegetarian');
  if (typeof isVegetarian === 'string') result.is_vegetarian = isVegetarian === 'true';
  const isSpicy = data.get('is_spicy');
  if (typeof isSpicy === 'string') result.is_spicy = isSpicy === 'true';
  const photo = data.get('photo');
  if (photo instanceof File) {
    (result as Record<string, unknown>).photo = photo;
  }
  return result;
}

export default function StaffDishesPage() {
  useAuth();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [dishList, categoryList] = await Promise.all([
        getDishList(),
        getCategoryList(),
      ]);
      setDishes(Array.isArray(dishList) ? dishList : []);
      setCategories(Array.isArray(categoryList) ? categoryList : []);
    } catch (err) {
      setError('Failed to load dishes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddNew = () => {
    setEditingDish(null);
    setShowModal(true);
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this dish? This cannot be undone.')) return;
    try {
      await deleteDish(id);
      setDishes((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError('Failed to delete dish. Please try again.');
    }
  };

  const handleSave = async (data: FormData) => {
    try {
      const dishData = formDataToDishData(data);
      if (editingDish) {
        const updated = await updateDish(editingDish.id, dishData);
        setDishes((prev) => prev.map((d) => (d.id === editingDish.id ? updated : d)));
      } else {
        const created = await createDish(dishData);
        setDishes((prev) => [...prev, created]);
      }
      setShowModal(false);
      setEditingDish(null);
    } catch (err) {
      setError('Failed to save dish. Please check the form and try again.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingDish(null);
  };

  return (
    <div className="ds-stack-lg">
      <StaffDishesHeader dishCount={dishes.length} onAddDish={handleAddNew} />
      {error && <Alert tone="danger">{error}</Alert>}
      <StaffDishesContent
        dishes={dishes}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
      {showModal && (
        <DishFormModal
          dish={editingDish}
          categories={categories}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
