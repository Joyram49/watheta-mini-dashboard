'use client';

import { AddOrderProvider } from '@/context/orders/AddOrdersContext';

import AddOrderNav from './AddOrderNav';

type Props = {
  readonly children: React.ReactNode;
};

const AddProductLayout = ({ children }: Props) => {
  return (
    <AddOrderProvider>
      <AddOrderNav />
      <div className='max-w-screen-[1440px] mx-auto min-h-screen px-4 lg:px-0'>
        {children}
      </div>
    </AddOrderProvider>
  );
};

export default AddProductLayout;
