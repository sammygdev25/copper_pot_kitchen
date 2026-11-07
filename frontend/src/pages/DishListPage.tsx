import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DishListHeader from '../components/DishListHeader';
import DishListFilters from '../components/DishListFilters';
import DishListGrid from '../components/DishListGrid';
import DishListPagination from '../components/DishListPagination';
import { getDishList, getCategoryList } from '../api';
import { useCart } from '../contexts/CartContext';
import type { Dish, Category } from '../types';
const __ctxNoop = () => { console.warn('[context] called a function the context does not provide'); };

const PAGE_SIZE = 12;

export default function DishListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>(searchParams.get('category') || '');
  const [sort, setSort] = useState<string>('name');
  const [page, setPage] = useState<number>(1);
  const { addToCart = __ctxNoop } = useCart();

  useEffect(() => {
    let active = true;
    async function loadData() {
      setLoading(true);
      try {
        const [dishList, categoryList] = await Promise.all([getDishList(), getCategoryList()]);
        if (active) {
          setDishes(Array.isArray(dishList) ? dishList : []);
          setCategories(Array.isArray(categoryList) ? categoryList : []);
        }
      } catch (err) {
        if (active) {
          setDishes([]);
          setCategories([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const paramCategory = searchParams.get('category') || '';
    setCategory(paramCategory);
  }, [searchParams]);

  function handleCategoryChange(value: string) {
    setCategory(value);
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('category', value);
    } else {
      next.delete('category');
    }
    setSearchParams(next);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleSortChange(value: string) {
    setSort(value);
    setPage(1);
  }

  function handleClearFilters() {
    setSearch('');
    handleCategoryChange('');
    setSort('name');
    setPage(1);
  }

  const filteredDishes = useMemo(() => {
    let result = dishes.filter((dish) => {
      const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category
        ? (typeof dish.category === 'object' && dish.category
            ? (dish.category as Category).slug === category
            : false)
        : true;
      return matchesSearch && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'price_low') return Number(a.price) - Number(b.price);
      if (sort === 'price_high') return Number(b.price) - Number(a.price);
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [dishes, search, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredDishes.length / PAGE_SIZE));
  const pagedDishes = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredDishes.slice(start, start + PAGE_SIZE);
  }, [filteredDishes, page]);

  async function handleAddToCart(dish: Dish) {
    await addToCart(dish);
  }

  return (
    <div className="ds-stack-lg">
      <DishListHeader resultCount={filteredDishes.length} loading={loading} />
      <DishListFilters
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
        categories={categories}
      />
      <DishListGrid
        dishes={pagedDishes}
        loading={loading}
        onAddToCart={handleAddToCart}
        onClearFilters={handleClearFilters}
      />
      <DishListPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}