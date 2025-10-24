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
import { useDeleteProduct } from '@/lib/hooks/useProducts';
import { Product } from '@/types/products';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function DeleteProductModal({
  isOpen,
  onClose,
  product,
}: DeleteProductModalProps) {
  const deleteProductMutation = useDeleteProduct();

  const handleDelete = () => {
    if (product) {
      deleteProductMutation.mutate(product.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    if (!deleteProductMutation.isPending) {
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
              <DialogTitle className='text-left'>Delete Product</DialogTitle>
              <DialogDescription className='text-left'>
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='py-4'>
          {product && (
            <div className='space-y-3'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Are you sure you want to delete{' '}
                <span className='font-semibold text-gray-900'>
                  &quot;{product.product_name}&quot;
                </span>
                ? This will permanently remove the product and all its data.
              </p>

              <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                <div className='flex items-start gap-2'>
                  <AlertTriangle className='mt-0.5 h-4 w-4 text-red-600' />
                  <div className='text-sm text-red-800'>
                    <p className='font-medium'>Warning</p>
                    <p className='mt-1'>
                      This action is permanent and cannot be reversed. All
                      product information, including inventory data, will be
                      lost.
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
            disabled={deleteProductMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={deleteProductMutation.isPending}
            className='gap-2'
          >
            {deleteProductMutation.isPending ? (
              <>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className='h-4 w-4' />
                Delete Product
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
