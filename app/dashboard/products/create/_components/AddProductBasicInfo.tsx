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
import { Textarea } from '@/components/ui/textarea';
import { useAddProductForm } from '@/context/products/AddProductContext';

const AddProductBasicInfo = () => {
  const { methods } = useAddProductForm();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const product_category = watch('product_category');

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='product_name'>Product Name *</Label>
              <Input
                id='product_name'
                {...register('product_name')}
                placeholder='Enter product name'
                className={errors.product_name ? 'border-red-500' : ''}
              />
              {errors.product_name && (
                <p className='text-sm text-red-500'>
                  {errors.product_name.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='product_sku'>Product SKU *</Label>
              <Input
                id='product_sku'
                {...register('product_sku')}
                placeholder='Enter product SKU'
                className={errors.product_sku ? 'border-red-500' : ''}
              />
              {errors.product_sku && (
                <p className='text-sm text-red-500'>
                  {errors.product_sku.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='product_category'>Product Category *</Label>
            <Select
              value={product_category}
              onValueChange={value => setValue('product_category', value)}
            >
              <SelectTrigger
                className={errors.product_category ? 'border-red-500' : ''}
              >
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='electronics'>Electronics</SelectItem>
                <SelectItem value='clothing'>Clothing</SelectItem>
                <SelectItem value='books'>Books</SelectItem>
                <SelectItem value='home'>Home & Garden</SelectItem>
                <SelectItem value='sports'>Sports</SelectItem>
                <SelectItem value='beauty'>Beauty & Health</SelectItem>
                <SelectItem value='toys'>Toys & Games</SelectItem>
                <SelectItem value='automotive'>Automotive</SelectItem>
              </SelectContent>
            </Select>
            {errors.product_category && (
              <p className='text-sm text-red-500'>
                {errors.product_category.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              {...register('description')}
              placeholder='Enter product description (optional)'
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className='text-sm text-red-500'>
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductBasicInfo;
