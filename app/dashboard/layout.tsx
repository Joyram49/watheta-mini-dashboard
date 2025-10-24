'use client';

import React, { useState } from 'react';

import { usePathname } from 'next/navigation';

import { TopNavbar } from '@/components/layout/TopNavbar';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';
import { Sheet, SheetContent } from '@/components/ui/sheet';

import SidebarContent from './_components/SidebarContent';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Generate breadcrumb items based on pathname
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Skip 'dashboard' segment
    const pathSegments = segments.slice(1);

    pathSegments.forEach((segment, index) => {
      const href = '/dashboard/' + pathSegments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);

      // Don't make the last item clickable
      if (index === pathSegments.length - 1) {
        items.push({ label });
      } else {
        items.push({ label, href });
      }
    });

    return items;
  };

  return (
    <div className='bg-background flex h-screen'>
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side='left' className='w-64 p-0'>
          <SidebarContent
            pathname={pathname}
            onLinkClick={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
        <div className='bg-sidebar border-sidebar-border flex grow flex-col gap-y-5 overflow-y-auto border-r'>
          <SidebarContent pathname={pathname} onLinkClick={() => {}} />
        </div>
      </div>

      {/* Main content */}
      <div className='flex flex-1 flex-col lg:pl-64'>
        {/* Top navbar */}
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          showMenuButton={true}
        />

        {/* Page content */}
        <main className='bg-muted/30 flex-1 overflow-x-hidden overflow-y-auto'>
          <div className='py-4 sm:py-6'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              {/* Breadcrumb Navigation */}
              {pathname !== '/dashboard' && (
                <div className='mb-4 sm:mb-6'>
                  <Breadcrumb items={getBreadcrumbItems()} />
                </div>
              )}

              {/* Dynamic Content Area */}
              <div className='space-y-4 sm:space-y-6'>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
