import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { productsApi } from '@/lib/api/products';
import { CreateProductFormData, Product } from '@/types/products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateProductFormData) =>
      productsApi.createProduct(data),
    onMutate: () => {
      toast.loading('Creating product...', {
        id: 'create-product',
      });
    },
    onSuccess: (data: Product) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });

      // Show success toast
      toast.success('Product created successfully!', {
        id: 'create-product',
        description: `${data.product_name} has been added to your products.`,
        duration: 5000,
      });

      // Navigate to products page
      router.push('/dashboard/orders');
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Failed to create product', {
        id: 'create-product',
        description: error.message || 'Please try again later.',
        duration: 5000,
      });
    },
  });
};

export const useGetProductById = (id: string | null) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) throw new Error('Product ID is required');
      return productsApi.getProductById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetProductByName = (name: string) => {
  return useQuery({
    queryKey: ['product-by-name', name],
    queryFn: () => productsApi.getProductByName(name),
    enabled: !!name,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateProductFormData }) =>
      productsApi.updateProduct(id, data),
    onMutate: () => {
      toast.loading('Updating product...', {
        id: 'update-product',
      });
    },
    onSuccess: (data: Product) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });

      // Show success toast
      toast.success('Product updated successfully!', {
        id: 'update-product',
        description: `${data.product_name} has been updated.`,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Failed to update product', {
        id: 'update-product',
        description: error.message || 'Please try again later.',
        duration: 5000,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.deleteProduct(id),
    onMutate: () => {
      // Show loading state immediately
      toast.loading('Deleting product...', {
        id: 'delete-product',
      });
    },
    onSuccess: (data, productId) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.removeQueries({ queryKey: ['product', productId] });

      // Show success toast
      toast.success('Product deleted successfully!', {
        id: 'delete-product',
        description: 'The product has been permanently removed.',
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Failed to delete product', {
        id: 'delete-product',
        description: error.message || 'Please try again later.',
        duration: 5000,
      });
    },
  });
};
