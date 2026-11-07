import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHero from '../components/HomeHero';
import HomeFeatured from '../components/HomeFeatured';
import HomeCategories from '../components/HomeCategories';
import HomeAbout from '../components/HomeAbout';
import HomeCta from '../components/HomeCta';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { getDishList, getCategoryList } from '../api';
import type { Dish, Category } from '../types';
const __ctxNoop = () => { console.warn('[context] called a function the context does not provide'); };

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart = __ctxNoop } = useCart();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([getDishList(), getCategoryList()])
      .then(([dishData, categoryData]) => {
        if (!mounted) return;
        setDishes(Array.isArray(dishData) ? dishData : []);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      })
      .catch(() => {
        if (!mounted) return;
        setDishes([]);
        setCategories([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const featuredDishes = dishes.slice(0, 8);
  const heroImage = dishes.find((d) => d.photo)?.photo;

  const handleBrowse = () => {
    navigate('/dishes');
  };

  const handleAddToCart = (dish: Dish) => {
    addToCart(dish, 1);
  };

  return (
    <div className="ds-stack-lg">
      <HomeHero imageUrl={heroImage ?? undefined} onBrowse={handleBrowse} />
      <HomeFeatured dishes={featuredDishes} loading={loading} onAddToCart={handleAddToCart} />
      <HomeCategories categories={categories} />
      <HomeAbout />
      <HomeCta isAuthenticated={isAuthenticated} />
    </div>
  );
}