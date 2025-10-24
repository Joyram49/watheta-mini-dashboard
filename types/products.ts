import { z } from 'zod';

// Product creation form schema
export const createProductSchema = z.object({
  // Basic Info
  product_name: z.string().min(1, 'Product name is required'),
  product_sku: z.string().min(1, 'Product SKU is required'),
  product_category: z.string().min(1, 'Product category is required'),
  description: z.string().optional(),

  // Inventory
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().min(0, 'Stock must be non-negative'),
  status: z.enum(['active', 'inactive', 'draft']).default('active'),

  // Media
  image: z.string().url('Must be a valid URL').optional(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;

// Product type based on your data structure
export interface Product {
  id: string;
  createdAt: number;
  product_name: string;
  product_sku: string;
  product_category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  status: string;
}

// Step navigation type
export interface ITabNavigationItem {
  label: string;
  component: React.ReactNode;
}
