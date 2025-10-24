import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { CreateProductResponse, productsApi } from '@/lib/api/products';
import { CreateProductFormData } from '@/types/products';

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
      //Show loading state immediately
      toast.loading('Creating product...', {
        id: 'create-product',
      });
    },
    onSuccess: (data: CreateProductResponse) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });

      // Show success toast
      toast.success('Product created successfully!', {
        id: 'create-product',
        description: `${data.product_name} has been added to your products.`,
        duration: 5000,
      });

      // Navigate to products page
      router.push('/dashboard/products');
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
