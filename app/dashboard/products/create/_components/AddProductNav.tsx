'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const AddProductNav = () => {
  return (
    <div className='bg-background border-b px-6 py-4'>
      <div className='flex items-center gap-4'>
        <Link href='/dashboard/products'>
          <Button variant='ghost' size='sm' className='hover:bg-accent'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Products
          </Button>
        </Link>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>Create New Product</h1>
          <p className='text-muted-foreground text-sm'>
            Add a new product to your inventory
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProductNav;
