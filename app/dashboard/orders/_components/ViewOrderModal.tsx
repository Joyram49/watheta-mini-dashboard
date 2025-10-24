'use client';

import { Calendar, DollarSign, Eye, Hash, Package } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useGetOrderById } from '@/lib/hooks/useOrders';

import DeliveryProgress from '../../products/_components/DeliveryProgress';

interface ViewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

export function ViewOrderModal({
  isOpen,
  onClose,
  orderId,
}: ViewOrderModalProps) {
  const { data: order, isLoading, error } = useGetOrderById(orderId);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='bg-gray-50 sm:max-w-[600px] dark:bg-zinc-900'>
          <DialogHeader>
            <div className='h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='mt-2 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !order) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='bg-gray-50 sm:max-w-[600px] dark:bg-zinc-900'>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              Failed to load order information.
            </DialogDescription>
          </DialogHeader>
          <div className='py-8 text-center'>
            <p className='text-red-600 dark:text-red-400'>
              {error?.message || 'Order not found'}
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
            Order {order.order_id || order.id}
          </DialogTitle>
          <DialogDescription>View detailed order information</DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Basic Order Info */}
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-3'>
              <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                <Package className='h-4 w-4' />
                Customer & Status
              </h3>
              <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                <div className='flex gap-2'>
                  <span className='font-semibold'>Client:</span>
                  <span>{order.client_name}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-semibold'>Payment Status:</span>
                  <Badge variant='outline' className='capitalize'>
                    {order.payment_status}
                  </Badge>
                </div>
                <div className='flex gap-2'>
                  <span className='font-semibold'>Delivery Status:</span>
                  <Badge variant='secondary' className='capitalize'>
                    {order.delivery_status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                <DollarSign className='h-4 w-4' />
                Payment & Progress
              </h3>
              <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                <div className='flex gap-2'>
                  <span className='font-semibold'>Total Amount:</span>
                  <span className='font-medium text-green-600 dark:text-green-400'>
                    {formatPrice(order?.quantity * order?.products?.length)}
                  </span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-semibold'>Delivery Progress:</span>
                  <DeliveryProgress
                    productId={order?.order_id}
                    className='w-32'
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
            <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Order Metadata
            </h3>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-gray-500' />
              <span>Created:</span>
              <span className='font-medium'>
                {formatDate(order.created_at)}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Hash className='h-4 w-4 text-gray-500' />
              <span>Order ID:</span>
              <span className='font-mono text-xs'>{order.order_id}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
