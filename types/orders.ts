import { z } from 'zod';

export const createOrderSchema = z.object({
  // Client Info
  client_name: z.string().trim().min(1, 'Client name is required'),

  // Product Info
  products: z
    .array(z.string().min(1, 'Product ID is required'))
    .nonempty('At least one product must be selected'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity is required' })
    .min(1, 'Quantity must be at least 1'),

  // Delivery Info
  delivery_address: z.string().trim().min(1, 'Delivery address is required'),
  expected_delivery_date: z.coerce
    .date({
      invalid_type_error: 'Expected delivery date is required',
    })
    .refine(date => date >= new Date(), {
      message: 'Expected delivery date cannot be in the past',
    }),

  // Statuses
  payment_status: z.enum(['paid', 'pending', 'refunded']).default('pending'),
  delivery_status: z
    .enum(['pending', 'shipped', 'delivered', 'canceled'])
    .default('pending'),

  // System Info
  order_id: z.string().default(() => `ORD-${Date.now()}`), // auto-generated
  created_at: z.coerce.date().default(() => new Date()),
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
  products: Product[]; // 👈 You can directly use the Product type here
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
