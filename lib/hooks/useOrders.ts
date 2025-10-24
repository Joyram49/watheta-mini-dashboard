import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ordersApi } from '@/lib/api/orders';
import {
  CreateOrderFormData,
  Order,
  UpdateOrderFormData,
} from '@/types/orders';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getOrders,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateOrderFormData) => ordersApi.createOrder(data),
    onMutate: () => {
      toast.loading('Creating order...', {
        id: 'create-order',
      });
    },
    onSuccess: (data: Order) => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      // Show success toast
      toast.success('Order created successfully!', {
        id: 'create-order',
        description: `${data.order_id} has been added to your orders.`,
        duration: 5000,
      });

      // Navigate to products page
      router.push('/dashboard/orders');
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Failed to create order', {
        id: 'create-order',
        description: error.message || 'Please try again later.',
        duration: 5000,
      });
    },
  });
};

export const useGetOrderById = (id: string | null) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => {
      if (!id) throw new Error('Order ID is required');
      return ordersApi.getOrderById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderFormData }) =>
      ordersApi.updateOrder(id, data),
    onMutate: () => {
      toast.loading('Updating order...', {
        id: 'update-order',
      });
    },
    onSuccess: (data: Order) => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', data.id] });

      // Show success toast
      toast.success('Order updated successfully!', {
        id: 'update-order',
        description: `${data.order_id} has been updated.`,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Failed to update order', {
        id: 'update-order',
        description: error.message || 'Please try again later.',
        duration: 5000,
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersApi.deleteOrder(id),
    onMutate: () => {
      // Show loading state immediately
      toast.loading('Deleting order...', {
        id: 'delete-order',
      });
    },
    onSuccess: (data, orderId) => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.removeQueries({ queryKey: ['order', orderId] });

      // Show success toast
      toast.success('Order deleted successfully!', {
        id: 'delete-order',
        description: 'The order has been permanently removed.',
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Failed to delete order', {
        id: 'delete-order',
        description: error.message || 'Please try again later.',
        duration: 5000,
      });
    },
  });
};
