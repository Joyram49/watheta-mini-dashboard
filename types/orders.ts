import { z } from 'zod';

export const createOrderSchema = z.object({
  // Client Info
  client_name: z.string().trim().min(1, 'Client name is required'),

  // Product Info
  products: z
    .array(z.string().min(1, 'Product ID is required'))
    .nonempty('At least one product must be selected'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),

  // Delivery Info
  delivery_address: z.string().trim().min(1, 'Delivery address is required'),
  expected_delivery_date: z
    .string()
    .min(1, 'Expected delivery date is required'),
  // Statuses
  payment_status: z.enum(['paid', 'pending', 'refunded']),
  delivery_status: z.enum(['pending', 'shipped', 'delivered', 'canceled']),

  // System Info
  order_id: z.string().min(1, 'OrderId is required'),
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

export type TPaymentStatus = 'paid' | 'pending' | 'refunded';
export type TDeliveryStatus = 'pending' | 'shipped' | 'delivered' | 'canceled';

// Product type based on data structure
export interface Order {
  id: string;
  order_id: string;
  client_name: string;
  products: string;
  quantity: number;
  payment_status: TPaymentStatus;
  delivery_status: TDeliveryStatus;
  expected_delivery_date: string;
  delivery_address: string;
  created_at: number;
}

// Step navigation type
export interface ITabNavigationItem {
  label: string;
  component: React.ReactNode;
}
