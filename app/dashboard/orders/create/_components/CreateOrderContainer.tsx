'use client';

import { toast } from 'sonner';

import { useAddOrderForm } from '@/context/orders/AddOrdersContext';
import { ITabNavigationItem } from '@/types/orders';

import AddOrderClientInfo from './AddOrderClientInfo';
import AddOrderDetails from './AddOrderDetails';
import AddOrderPayment from './AddOrderPayment';
import AddOrderTabs from './AddOrderTabs';

export default function CreateOrderContainer() {
  const { methods, handleSubmit, isLoading } = useAddOrderForm();

  const tabItems: ITabNavigationItem[] = [
    {
      label: 'Client Information',
      component: <AddOrderClientInfo />,
    },
    {
      label: 'Order Details',
      component: <AddOrderDetails />,
    },
    {
      label: 'Payment & Delivery',
      component: <AddOrderPayment />,
    },
  ];

  // Get all form values
  const { client_name, delivery_address, products, quantity } = methods.watch();

  // Disable Next button if fields are missing
  const isNextStepDisabled = (currentStep: number): boolean => {
    switch (currentStep) {
      case 0:
        return !client_name || !delivery_address;
      case 1:
        return !products?.length || quantity < 1;
      default:
        return false;
    }
  };

  // Submit handler
  const handleCreateOrder = async () => {
    try {
      const isValid = await methods.trigger();
      if (!isValid) {
        toast.error('Please fill in all required fields');
        return;
      }

      const formData = methods.getValues();

      // Auto-generate order ID
      const orderData = {
        ...formData,
        order_id: `ORD-${Date.now()}`,
      };

      handleSubmit(orderData);
    } catch {
      toast.error('Failed to validate form. Please try again.');
    }
  };

  // Step Navigation Logic
  const handleNext = async (step: number, goNext: () => void) => {
    if (step === 0) {
      const isValid = await methods.trigger([
        'client_name',
        'delivery_address',
        'expected_delivery_date',
      ]);
      if (!isValid) {
        toast.error('Please fill in all required fields');
        return;
      }
      goNext();
    } else if (step === 1) {
      const isValid = await methods.trigger(['products', 'quantity']);
      if (!isValid) {
        toast.error('Please fill in all required fields');
        return;
      }
      goNext();
    } else {
      goNext();
    }
  };

  return (
    <div>
      <AddOrderTabs
        tabs={tabItems}
        onNext={handleNext}
        onPublish={handleCreateOrder}
        submitButtonName='Create Order'
        footerText='Review your order before submission'
        isNextDisabled={currentStep => isNextStepDisabled(currentStep)}
        isNextSubmitBtnLoading={isLoading}
      />
    </div>
  );
}
