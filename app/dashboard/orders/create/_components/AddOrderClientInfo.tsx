'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAddOrderForm } from '@/context/orders/AddOrdersContext';
import { cn } from '@/lib/utils';

export default function AddOrderClientInfo() {
  const { methods } = useAddOrderForm();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const expectedDate = watch('expected_delivery_date');

  // Compute the earliest selectable date (tomorrow)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-semibold'>Client Information</h2>
        <p className='text-muted-foreground text-sm'>
          Provide client details and delivery information.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {/* Client name */}
        <div className='space-y-2'>
          <Label htmlFor='client_name'>Client Name</Label>
          <Input
            id='client_name'
            placeholder='Enter client name'
            {...register('client_name')}
          />
          {errors.client_name && (
            <p className='text-sm text-red-500'>
              {String(errors.client_name.message)}
            </p>
          )}
        </div>

        {/* Expected delivery date */}
        <div className='space-y-2'>
          <Label>Expected Delivery Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !expectedDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {expectedDate
                  ? format(expectedDate, 'PPP')
                  : 'Select delivery date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={expectedDate ? new Date(expectedDate) : undefined}
                onSelect={date =>
                  date
                    ? setValue('expected_delivery_date', date.toISOString())
                    : null
                }
                disabled={date => date < tomorrow}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.expected_delivery_date && (
            <p className='text-sm text-red-500'>
              {String(errors.expected_delivery_date.message)}
            </p>
          )}
        </div>
      </div>

      {/* Delivery address */}
      <div className='space-y-2'>
        <Label htmlFor='delivery_address'>Delivery Address</Label>
        <Input
          id='delivery_address'
          placeholder='Enter delivery address'
          {...register('delivery_address')}
        />
        {errors.delivery_address && (
          <p className='text-sm text-red-500'>
            {String(errors.delivery_address.message)}
          </p>
        )}
      </div>
    </div>
  );
}
