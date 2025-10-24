'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useGetProductById, useUpdateProduct } from '@/lib/hooks/useProducts';
import { CreateProductFormData, createProductSchema } from '@/types/products';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
}

export function EditProductModal({
  isOpen,
  onClose,
  productId,
}: EditProductModalProps) {
  const { data: product, isLoading, error } = useGetProductById(productId);
  const updateProductMutation = useUpdateProduct();

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      product_name: '',
      product_sku: '',
      product_category: '',
      description: '',
      price: 0,
      stock: 0,
      status: 'active' as const,
      image: '',
    },
  });

  // Populate form when product data is loaded
  useEffect(() => {
    if (product) {
      form.reset({
        product_name: product.product_name,
        product_sku: product.product_sku,
        product_category: product.product_category,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        status: product.status as 'active' | 'inactive' | 'draft',
        image: product.image || '',
      });
    }
  }, [product, form]);

  const onSubmit = (data: CreateProductFormData) => {
    if (productId) {
      updateProductMutation.mutate(
        { id: productId, data },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-gray-50 sm:max-w-[600px] dark:bg-zinc-900'>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product information below.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='h-4 animate-pulse rounded bg-gray-200'></div>
              <div className='h-10 animate-pulse rounded bg-gray-200'></div>
            </div>
            <div className='space-y-2'>
              <div className='h-4 animate-pulse rounded bg-gray-200'></div>
              <div className='h-10 animate-pulse rounded bg-gray-200'></div>
            </div>
            <div className='space-y-2'>
              <div className='h-4 animate-pulse rounded bg-gray-200'></div>
              <div className='h-10 animate-pulse rounded bg-gray-200'></div>
            </div>
            <div className='space-y-2'>
              <div className='h-4 animate-pulse rounded bg-gray-200'></div>
              <div className='h-10 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>
        ) : error ? (
          <div className='py-8 text-center'>
            <p className='text-red-600'>Failed to load product data</p>
            <p className='mt-2 text-sm text-gray-500'>
              {error.message || 'Please try again later.'}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='product_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name *</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter product name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='product_sku'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product SKU *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter product SKU'
                          {...field}
                          onChange={e =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='product_category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter product category' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter product description'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price *</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder='0.00'
                          {...field}
                          onChange={e =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='stock'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock *</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='0'
                          {...field}
                          onChange={e =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='active'>Active</SelectItem>
                          <SelectItem value='inactive'>Inactive</SelectItem>
                          <SelectItem value='draft'>Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter image URL' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type='button' variant='outline' onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={updateProductMutation.isPending}
                >
                  {updateProductMutation.isPending
                    ? 'Updating...'
                    : 'Update Product'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
