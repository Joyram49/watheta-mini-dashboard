import * as React from 'react';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-1 md:space-x-3'>
        <li>
          <div>
            <Link
              href='/dashboard'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              <Home className='h-4 w-4' />
              <span className='sr-only'>Home</span>
            </Link>
          </div>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className='flex items-center'>
              <ChevronRight className='text-muted-foreground mx-1 h-4 w-4' />
              {item.href ? (
                <Link
                  href={item.href}
                  className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
                >
                  {item.label}
                </Link>
              ) : (
                <span className='text-foreground text-sm font-medium'>
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
