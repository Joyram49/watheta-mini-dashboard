'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const AddOrderNav = () => {
  return (
    <div className='rounded-lg border-b bg-gray-50 px-6 py-4 dark:bg-zinc-900'>
      <div className='flex items-center gap-4'>
        <Link href='/dashboard/orders'>
          <Button variant='ghost' size='sm' className='hover:bg-accent'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Orders
          </Button>
        </Link>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>Create New Order</h1>
          <p className='text-muted-foreground text-sm'>
            Add a new order to your orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddOrderNav;
