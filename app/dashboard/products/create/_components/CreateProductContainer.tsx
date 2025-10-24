'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { useAddProductForm } from '@/context/products/AddProductContext';
import { ITabNavigationItem } from '@/types/products';

import AddProductBasicInfo from './AddProductBasicInfo';
import AddProductInventory from './AddProductInventory';
import AddProductMedia from './AddProductMedia';
import AddProductTabs from './AddProductTabs';

export default function CreateProductContainer() {
  const { methods, handleSubmit, isLoading } = useAddProductForm();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  const tabItems: ITabNavigationItem[] = [
    {
      label: 'Basic Information',
      component: <AddProductBasicInfo />,
    },
    {
      label: 'Inventory & Pricing',
      component: <AddProductInventory />,
    },
    {
      label: 'Media',
      component: <AddProductMedia onUploadStateChange={setIsImageUploading} />,
    },
  ];

  // Get all form values
  const { product_name, product_sku, product_category, price, stock } =
    methods.watch();

  // Disabled next or publish button if required fields are not fulfilled
  const isNextStepDisabled = (currentStep: number): boolean => {
    switch (currentStep) {
      case 0:
        return !product_name || !product_sku || !product_category;
      case 1:
        return !price || price <= 0 || stock < 0;
      case 2:
        return false;
      default:
        return false;
    }
  };

  // Handle form submission
  const handleCreateProduct = async () => {
    try {
      // Validate form
      const isValid = await methods.trigger();
      if (!isValid) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Get all form data and submit
      const formData = methods.getValues();
      handleSubmit(formData);
    } catch {
      toast.error('Failed to validate form. Please try again.');
    }
  };

  // Handle next step
  const handleNext = async (step: number, goNext: () => void) => {
    if (step === 0) {
      // Validate basic info
      const isValid = await methods.trigger([
        'product_name',
        'product_sku',
        'product_category',
      ]);
      if (isValid) {
        goNext();
      } else {
        toast.error('Please fill in all required fields');
      }
    } else if (step === 1) {
      // Validate inventory
      const isValid = await methods.trigger(['price', 'stock', 'status']);
      if (isValid) {
        goNext();
      } else {
        toast.error('Please fill in all required fields');
      }
    } else {
      goNext();
    }
  };

  return (
    <div>
      <AddProductTabs
        tabs={tabItems}
        onNext={handleNext}
        onPublish={handleCreateProduct}
        submitButtonName='Create Product'
        footerText='Review your product information before creating'
        isNextDisabled={currentStep => isNextStepDisabled(currentStep)}
        isNextSubmitBtnLoading={isLoading}
        isImageUploading={isImageUploading}
      />
    </div>
  );
}
