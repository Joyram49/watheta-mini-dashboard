'use client';

import { AlertTriangle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteOrder } from '@/lib/hooks/useOrders';
import { Order } from '@/types/orders';

interface DeleteOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export function DeleteOrderModal({
  isOpen,
  onClose,
  order,
}: DeleteOrderModalProps) {
  const deleteOrderMutation = useDeleteOrder();

  const handleDelete = () => {
    if (order) {
      deleteOrderMutation.mutate(order.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    if (!deleteOrderMutation.isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-gray-50 sm:max-w-[425px] dark:bg-zinc-900'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-100'>
              <AlertTriangle className='h-5 w-5 text-red-600' />
            </div>
            <div>
              <DialogTitle className='text-left'>Delete Order</DialogTitle>
              <DialogDescription className='text-left'>
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='py-4'>
          {order && (
            <div className='space-y-3'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Are you sure you want to delete order{' '}
                <span className='font-semibold text-gray-900'>
                  &quot;{order.id}&quot;
                </span>
                ? This will permanently remove the order and all its data.
              </p>

              <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                <div className='flex items-start gap-2'>
                  <AlertTriangle className='mt-0.5 h-4 w-4 text-red-600' />
                  <div className='text-sm text-red-800'>
                    <p className='font-medium'>Warning</p>
                    <p className='mt-1'>
                      This action is permanent and cannot be reversed. All order
                      details, including customer and payment information, will
                      be lost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className='gap-2'>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={deleteOrderMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={deleteOrderMutation.isPending}
            className='gap-2'
          >
            {deleteOrderMutation.isPending ? (
              <>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className='h-4 w-4' />
                Delete Order
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
