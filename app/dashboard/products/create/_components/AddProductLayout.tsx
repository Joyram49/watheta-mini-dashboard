'use client';

import { AddProductProvider } from '@/context/products/AddProductContext';

import AddProductNav from './AddProductNav';

type Props = {
  readonly children: React.ReactNode;
};

const AddProductLayout = ({ children }: Props) => {
  return (
    <AddProductProvider>
      <AddProductNav />
      <div className='max-w-screen-[1440px] mx-auto min-h-screen px-4 lg:px-0'>
        {children}
      </div>
    </AddProductProvider>
  );
};

export default AddProductLayout;
