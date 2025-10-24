'use client';

import React, { createContext, useContext } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCreateProduct } from '@/lib/hooks/useProducts';
import { CreateProductFormData, createProductSchema } from '@/types/products';

interface AddProductContextType {
  methods: ReturnType<typeof useForm<CreateProductFormData>>;
  handleSubmit: (data: CreateProductFormData) => void;
  isLoading: boolean;
  error: Error | null;
}

const AddProductContext = createContext<AddProductContextType | undefined>(
  undefined
);

export const useAddProductForm = () => {
  const context = useContext(AddProductContext);
  if (!context) {
    throw new Error('useAddProductForm must be used within AddProductProvider');
  }
  return context;
};

interface AddProductProviderProps {
  children: React.ReactNode;
}

export const AddProductProvider: React.FC<AddProductProviderProps> = ({
  children,
}) => {
  const createProductMutation = useCreateProduct();

  const methods = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      product_name: '',
      product_sku: '',
      product_category: '',
      description: '',
      price: 0,
      stock: 0,
      status: 'active',
      image: '',
    },
  });

  const handleSubmit = (data: CreateProductFormData) => {
    createProductMutation.mutate(data);
  };

  return (
    <AddProductContext.Provider
      value={{
        methods,
        handleSubmit,
        isLoading: createProductMutation.isPending,
        error: createProductMutation.error,
      }}
    >
      {children}
    </AddProductContext.Provider>
  );
};
