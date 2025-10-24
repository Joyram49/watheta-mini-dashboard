'use client';

import Image from 'next/image';

import ImageUploader from '@/components/shared/ImageUploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAddProductForm } from '@/context/products/AddProductContext';

interface AddProductMediaProps {
  onUploadStateChange?: (isUploading: boolean) => void;
}

const AddProductMedia = ({ onUploadStateChange }: AddProductMediaProps) => {
  const { methods } = useAddProductForm();
  const {
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const image = watch('image');

  const handleImageChange = (url: string) => {
    setValue('image', url);
  };

  const handleUploadStateChange = (isUploading: boolean) => {
    onUploadStateChange?.(isUploading);
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Product Media</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Product Image */}
          <div className='space-y-2'>
            <Label htmlFor='image'>Product Image</Label>
            <ImageUploader
              value={image}
              onChange={handleImageChange}
              onUploadStateChange={handleUploadStateChange}
              buttonText='Upload Image'
              accept='image/*'
            />
            {errors.image && (
              <p className='text-sm text-red-500'>{errors.image.message}</p>
            )}

            {image && (
              <div className='mt-4'>
                <Image
                  src={image}
                  alt='Product preview'
                  width={128}
                  height={128}
                  className='h-32 w-32 rounded-lg object-cover'
                />
              </div>
            )}
          </div>

          <div className='rounded-md bg-yellow-50 p-4'>
            <h4 className='font-medium text-yellow-900'>Image Guidelines</h4>
            <ul className='mt-2 text-sm text-yellow-800'>
              <li>• Use high-quality images (minimum 800x800px)</li>
              <li>• Image should clearly show the product</li>
              <li>• Supported formats: JPG, PNG, WebP</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductMedia;
