/**
 * Auto-generated TypeScript types and Zod schemas from ProjectContract.
 * Model interfaces match the Django backend exactly.
 */
import { z } from 'zod';

// DRF returns a related object either as its pk or nested; parse both to the pk
// so the parsed type matches the number typed FK fields on the interfaces.
const zRelation = z.union([z.coerce.number().int(), z.object({ id: z.coerce.number().int() }).passthrough()]).transform((v) => (typeof v === 'number' ? v : v.id));

// ── User ──
export interface User {
  id: number;
  role: string;
  created_at: string;
  updated_at: string;
}

export const UserSchema = z.object({
  id: z.coerce.number(),
  role: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
}).passthrough();

// ── Category ──
export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const CategorySchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  slug: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
}).passthrough();

// ── Dish ──
export interface Dish {
  id: number;
  name: string;
  category: number;
  price: number;
  description: string;
  photo: string | null;
  is_vegetarian: boolean;
  is_spicy: boolean;
  created_at: string;
  updated_at: string;
}

export const DishSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  category: zRelation,
  price: z.coerce.number(),
  description: z.string(),
  photo: z.string().nullable().nullable(),
  is_vegetarian: z.boolean(),
  is_spicy: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
}).passthrough();

// ── Order ──
export interface Order {
  id: number;
  user: number;
  status: string;
  total_amount: number;
  is_paid: boolean;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  stripe_session_id: string | null;
}

export const OrderSchema = z.object({
  id: z.coerce.number(),
  user: zRelation,
  status: z.string(),
  total_amount: z.coerce.number(),
  is_paid: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  paid_at: z.string().nullable(),
  stripe_session_id: z.string().nullable(),
}).passthrough();

// ── OrderItem ──
export interface OrderItem {
  id: number;
  order: number;
  dish: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export const OrderItemSchema = z.object({
  id: z.coerce.number(),
  order: zRelation,
  dish: zRelation,
  quantity: z.coerce.number().int().nonnegative(),
  price: z.coerce.number(),
  created_at: z.string(),
  updated_at: z.string(),
}).passthrough();

// ── Paginated Response ──
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    count: z.coerce.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(itemSchema),
  });

// Added by integration: exports other files import from this module.
export type OrderStatus = 'placed' | 'preparing' | 'ready' | 'completed';
