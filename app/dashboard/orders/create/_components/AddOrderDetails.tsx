'use client';

import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddOrderForm } from '@/context/orders/AddOrdersContext';

interface Product {
  id: string;
  product_name: string;
}

export default function AddOrderDetails() {
  const { methods } = useAddOrderForm();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products (replace with your actual API endpoint)
    fetch('https://68f9797cef8b2e621e7c2bea.mockapi.io/api/v1/products')
      .then(res => res.json())
      .then(data => setProductsList(data))
      .catch(() => setProductsList([]));
  }, []);

  const selectedProducts = watch('products') || [];

  const toggleProduct = (id: string) => {
    const updated = selectedProducts.includes(id)
      ? selectedProducts.filter((p: string) => p !== id)
      : [...selectedProducts, id];
    setValue('products', updated);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-semibold'>Order Details</h2>
        <p className='text-muted-foreground text-sm'>
          Select products and specify quantity.
        </p>
      </div>

      <div className='space-y-3'>
        <Label>Select Products</Label>
        <div className='max-h-60 overflow-y-auto rounded-md border p-3'>
          {productsList.length > 0 ? (
            productsList.map(product => (
              <label
                key={product.id}
                className='flex cursor-pointer items-center gap-2 py-1'
              >
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleProduct(product.id)}
                />
                <span>{product.product_name}</span>
              </label>
            ))
          ) : (
            <p className='text-muted-foreground text-sm'>
              Loading or no products available
            </p>
          )}
        </div>
        {errors.products && (
          <p className='text-sm text-red-500'>
            {String(errors.products.message)}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='quantity'>Quantity</Label>
        <Input
          id='quantity'
          type='number'
          placeholder='Enter quantity'
          {...register('quantity', { valueAsNumber: true })}
        />
        {errors.quantity && (
          <p className='text-sm text-red-500'>
            {String(errors.quantity.message)}
          </p>
        )}
      </div>
    </div>
  );
}
