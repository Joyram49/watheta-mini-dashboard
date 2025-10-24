import { z } from 'zod';

import { Product } from './products';

export const createOrderSchema = z.object({
  client_name: z.string().trim().min(1, 'Client name is required'),
  products: z
    .array(z.string().min(1, 'Product ID is required'))
    .nonempty('At least one product must be selected'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  delivery_address: z.string().trim().min(1, 'Delivery address is required'),
  expected_delivery_date: z.string(),
  payment_status: z.enum(['paid', 'pending', 'refunded']),
  delivery_status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']),
  order_id: z.string(),
});
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

export const updateOrderSchema = createOrderSchema
  .omit({
    order_id: true,
    created_at: true,
  })
  .extend({
    order_id: z.string().readonly(),
    created_at: z.coerce.date().readonly(),
  });

export type UpdateOrderFormData = z.infer<typeof updateOrderSchema>;

// Product type based on data structure
export interface Order {
  order_id: string;
  client_name: string;
  products: Product[];
  quantity: number;
  delivery_address: string;
  payment_status: 'paid' | 'pending' | 'refunded';
  delivery_status: 'pending' | 'shipped' | 'delivered' | 'canceled';
  expected_delivery_date: Date;
  created_at: Date;
}

// Step navigation type
export interface ITabNavigationItem {
  label: string;
  component: React.ReactNode;
}
