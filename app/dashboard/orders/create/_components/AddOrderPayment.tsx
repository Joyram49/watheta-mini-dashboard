'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAddOrderForm } from '@/context/orders/AddOrdersContext';
import { TDeliveryStatus, TPaymentStatus } from '@/types/orders';

export default function AddOrderPayment() {
  const { methods } = useAddOrderForm();
  const {
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const payment_status = watch('payment_status');
  const delivery_status = watch('delivery_status');

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-semibold'>Payment & Delivery</h2>
        <p className='text-muted-foreground text-sm'>
          Set payment and delivery statuses for this order.
        </p>
      </div>

      {/* Payment Status */}
      <div className='space-y-2'>
        <Label>Payment Status</Label>
        <Select
          value={payment_status}
          onValueChange={value =>
            setValue('payment_status', value as TPaymentStatus)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select payment status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='paid'>Paid</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='refunded'>Refunded</SelectItem>
          </SelectContent>
        </Select>
        {errors.payment_status && (
          <p className='text-sm text-red-500'>
            {String(errors.payment_status.message)}
          </p>
        )}
      </div>

      {/* Delivery Status */}
      <div className='space-y-2'>
        <Label>Delivery Status</Label>
        <Select
          value={delivery_status}
          onValueChange={value =>
            setValue('delivery_status', value as TDeliveryStatus)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select delivery status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='shipped'>Shipped</SelectItem>
            <SelectItem value='delivered'>Delivered</SelectItem>
            <SelectItem value='cancelled'>Cancelled</SelectItem>
          </SelectContent>
        </Select>
        {errors.delivery_status && (
          <p className='text-sm text-red-500'>
            {String(errors.delivery_status.message)}
          </p>
        )}
      </div>
    </div>
  );
}
