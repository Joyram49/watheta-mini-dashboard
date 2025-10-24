'use client';

import { useEffect, useRef, useState } from 'react';

import { Loader } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { ITabNavigationItem } from '@/types/products';

type Props = {
  tabs: ITabNavigationItem[];
  onNext?: (
    _currentIndex: number,
    _goNext: () => void,
    _goBack: () => void
  ) => void;
  onBack?: (_currentIndex: number, _goBack: (_step?: number) => void) => void;
  onPublish?: () => void;
  isPublishDisabled?: boolean;
  isNextDisabled?: (_currentIndex: number) => boolean;
  tabsClassName?: string;
  isLoading?: boolean;
  isNextSubmitBtnLoading?: boolean;
  isImageUploading?: boolean;
  submitButtonName?: string;
  footerText?: string;
};

export default function AddProductTabs({
  tabs,
  onNext,
  onBack,
  isNextDisabled,
  onPublish,
  isPublishDisabled,
  isLoading,
  isNextSubmitBtnLoading,
  isImageUploading,
  submitButtonName,
  footerText,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const goNext = () => {
    if (activeStep < tabs.length - 1) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
    }
  };

  const goBack = (step?: number) => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
    }

    if (step) {
      setActiveStep(step);
    }
  };

  const handleNextClick = () => {
    if (onNext) {
      onNext(activeStep, goNext, goBack);
    } else {
      goNext();
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack(activeStep, goBack);
    } else {
      goBack();
    }
  };

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep]);

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Content */}
      <div className='grow px-4 py-6 lg:px-8'>
        {isLoading ? (
          <ProductFormSkeleton />
        ) : (
          <div ref={contentRef}>{tabs[activeStep].component}</div>
        )}
        <div className='h-20' />
      </div>

      {/* Footer */}
      <div className='bg-background sticky bottom-0 left-0 z-20 rounded-lg border-t'>
        {/* Progress bar */}
        <div className='bg-muted/30 px-6 py-3'>
          <div className='flex items-center justify-center space-x-2'>
            {tabs.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index <= activeStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className='text-muted-foreground mt-2 text-center text-sm'>
            Step {activeStep + 1} of {tabs.length}: {tabs[activeStep].label}
          </div>
        </div>

        {/* Footer buttons */}
        <div className='flex justify-between rounded-lg bg-gray-50 px-6 py-4 dark:bg-zinc-900'>
          {/* Back button */}
          <button
            type='button'
            onClick={handleBackClick}
            disabled={activeStep === 0}
            className='border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
          >
            Back
          </button>

          {/* Next/Submit button */}
          {activeStep === tabs.length - 1 ? (
            <div className='flex items-center gap-4'>
              {footerText && (
                <span className='text-muted-foreground text-sm'>
                  {footerText}
                </span>
              )}
              <button
                type='button'
                onClick={onPublish}
                disabled={
                  isNextSubmitBtnLoading ||
                  (isPublishDisabled ?? false) ||
                  (isImageUploading ?? false)
                }
                className='bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
              >
                {isImageUploading
                  ? 'Uploading Image...'
                  : submitButtonName
                    ? submitButtonName
                    : 'Create Product'}
              </button>
            </div>
          ) : (
            <button
              type='button'
              onClick={handleNextClick}
              disabled={
                isNextSubmitBtnLoading ||
                (isNextDisabled?.(activeStep) ?? false)
              }
              className='bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-md px-8 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
            >
              {isNextSubmitBtnLoading && (
                <Loader className='h-4 w-4 animate-spin' />
              )}
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const ProductFormSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Basic Info Section */}
      <div className='bg-muted/30 space-y-4 rounded-md p-4'>
        <Skeleton className='h-4 w-40' />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </div>

      {/* Inventory Section */}
      <div className='bg-muted/30 space-y-4 rounded-md p-4'>
        <Skeleton className='h-4 w-40' />
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </div>
    </div>
  );
};
