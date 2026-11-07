import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import type { Dish } from '../types';

export interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (dish: Dish, quantity?: number) => void;
  addToCart: (dish: Dish, quantity?: number) => void;
  removeItem: (dishId: number) => void;
  updateQuantity: (dishId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'restaurant_cart_items';

function loadInitialItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialItems);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      // ignore storage errors
    }
  }, [items]);

  const addItem = (dish: Dish, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { dish, quantity }];
    });
  };

  const addToCart = (dish: Dish, quantity: number = 1) => {
    addItem(dish, quantity);
  };

  const removeItem = (dishId: number) => {
    setItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(dishId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = Number(item.dish.price) || 0;
        return sum + price * item.quantity;
      }, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    total,
    itemCount,
    addItem,
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
