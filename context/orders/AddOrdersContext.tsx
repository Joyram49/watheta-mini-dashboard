'use client';

import React, { createContext, useContext } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCreateProduct } from '@/lib/hooks/useProducts';
import { CreateOrderFormData, createOrderSchema } from '@/types/orders';

interface AddOrderContextType {
  methods: ReturnType<typeof useForm<CreateOrderFormData>>;
  handleSubmit: (data: CreateOrderFormData) => void;
  isLoading: boolean;
  error: Error | null;
}

const AddOrderContext = createContext<AddOrderContextType | undefined>(
  undefined
);

export const useAddOrderForm = () => {
  const context = useContext(AddOrderContext);
  if (!context) {
    throw new Error('useAddOrderForm must be used within AddOrderProvider');
  }
  return context;
};

interface AddOrderProviderProps {
  children: React.ReactNode;
}

export const AddOrderProvider: React.FC<AddOrderProviderProps> = ({
  children,
}) => {
  const createOrderMutation = useCreateProduct();

  const methods = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      client_name: '',
      products: [],
      quantity: 2,
      delivery_address: '',
      expected_delivery_date: '',
      payment_status: 'pending',
      delivery_status: 'pending',
      order_id: '',
    },
  });
  const handleSubmit = (data: CreateOrderFormData) => {
    createOrderMutation.mutate(data);
  };
  return (
    <AddOrderContext.Provider
      value={{
        methods,
        handleSubmit,
        isLoading: createOrderMutation.isPending,
        error: createOrderMutation.error,
      }}
    >
      {children}
    </AddOrderContext.Provider>
  );
};
