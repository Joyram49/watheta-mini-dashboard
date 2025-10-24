'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAddProductForm } from '@/context/products/AddProductContext';

const AddProductInventory = () => {
  const { methods } = useAddProductForm();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const status = watch('status');

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Inventory & Pricing</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='price'>Price *</Label>
              <Input
                id='price'
                type='number'
                step='0.01'
                min='0'
                {...register('price', { valueAsNumber: true })}
                placeholder='0.00'
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className='text-sm text-red-500'>{errors.price.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='stock'>Stock Quantity *</Label>
              <Input
                id='stock'
                type='number'
                min='0'
                {...register('stock', { valueAsNumber: true })}
                placeholder='0'
                className={errors.stock ? 'border-red-500' : ''}
              />
              {errors.stock && (
                <p className='text-sm text-red-500'>{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='status'>Product Status *</Label>
            <Select
              value={status}
              onValueChange={value =>
                setValue('status', value as 'active' | 'inactive' | 'draft')
              }
            >
              <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='draft'>Draft</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className='text-sm text-red-500'>{errors.status.message}</p>
            )}
          </div>

          <div className='rounded-md bg-blue-50 p-4'>
            <h4 className='font-medium text-blue-900'>Status Guidelines</h4>
            <ul className='mt-2 text-sm text-blue-800'>
              <li>
                <strong>Active:</strong> Product is live and available for
                purchase (default)
              </li>
              <li>
                <strong>Draft:</strong> Product is being prepared and not
                visible to customers
              </li>
              <li>
                <strong>Inactive:</strong> Product is temporarily unavailable
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductInventory;
