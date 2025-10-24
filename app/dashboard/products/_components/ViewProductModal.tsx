'use client';

import {
  Calendar,
  DollarSign,
  Eye,
  Hash,
  Image as ImageIcon,
  Package,
  Tag,
} from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useGetProductById } from '@/lib/hooks/useProducts';

import StatusBadge from './StatusBadge';
import StockIndicator from './StockIndicator';

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
}

export function ViewProductModal({
  isOpen,
  onClose,
  productId,
}: ViewProductModalProps) {
  const { data: product, isLoading, error } = useGetProductById(productId);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='bg-gray-50 sm:max-w-[600px] dark:bg-zinc-900'>
          <DialogHeader>
            <div className='h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='h-32 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='space-y-2'>
              <div className='h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
              <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !product) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='bg-gray-50 sm:max-w-[600px] dark:bg-zinc-900'>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              Failed to load product information.
            </DialogDescription>
          </DialogHeader>
          <div className='py-8 text-center'>
            <p className='text-red-600 dark:text-red-400'>
              {error?.message || 'Product not found'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-gray-50 sm:max-w-[600px] dark:bg-zinc-900'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Eye className='h-5 w-5' />
            {product.product_name}
          </DialogTitle>
          <DialogDescription>
            View detailed product information
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Product Image */}
          <div className='flex justify-center'>
            <div className='relative h-48 w-48 overflow-hidden rounded-lg border bg-gray-100 dark:bg-gray-800'>
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.product_name}
                  fill
                  className='object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center'>
                  <ImageIcon className='h-12 w-12 text-gray-400' />
                </div>
              )}
            </div>
          </div>

          {/* Product Details Grid */}
          <div className='grid gap-4 md:grid-cols-2'>
            {/* Basic Information */}
            <div className='space-y-3'>
              <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                <Package className='h-4 w-4' />
                Basic Information
              </h3>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Tag className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    SKU:
                  </span>
                  <span className='font-mono text-sm'>
                    {product.product_sku}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Package className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    Category:
                  </span>
                  <Badge variant='outline' className='capitalize'>
                    {product.product_category}
                  </Badge>
                </div>
                <div className='flex items-center gap-2'>
                  <Hash className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    Status:
                  </span>
                  <StatusBadge status={product.status} />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className='space-y-3'>
              <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                <DollarSign className='h-4 w-4' />
                Pricing & Inventory
              </h3>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <DollarSign className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    Price:
                  </span>
                  <span className='text-lg font-semibold text-green-600 dark:text-green-400'>
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Package className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    Stock:
                  </span>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>{product.stock}</span>
                    <StockIndicator stock={product.stock} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          {product.description && (
            <div className='space-y-2'>
              <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Description
              </h3>
              <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
                {product.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className='space-y-2'>
            <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Product Information
            </h3>
            <div className='grid gap-2 text-sm'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-gray-500' />
                <span className='text-gray-600 dark:text-gray-400'>
                  Created:
                </span>
                <span className='font-medium'>
                  {formatDate(Number(product.createdAt))}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Hash className='h-4 w-4 text-gray-500' />
                <span className='text-gray-600 dark:text-gray-400'>
                  Product ID:
                </span>
                <span className='font-mono text-xs'>{product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
