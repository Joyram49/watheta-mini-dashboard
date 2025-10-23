'use client';

import React from 'react';

import {
  Package2,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: Package2,
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
];

interface SidebarContentProps {
  pathname: string;
  onLinkClick: () => void;
}

function SidebarContent({ pathname, onLinkClick }: SidebarContentProps) {
  return (
    <div className='flex h-full flex-col'>
      {/* Logo */}
      <div className='border-sidebar-border flex h-16 shrink-0 items-center border-b px-6'>
        <div className='flex items-center space-x-3'>
          <div className='bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg'>
            <Package2 className='h-5 w-5' />
          </div>
          <span className='text-foreground text-xl font-bold'>Watheta</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-2 px-3 py-6'>
        <div className='px-3 py-2'>
          <h3 className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
            Main Menu
          </h3>
        </div>
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm'
              )}
              onClick={onLinkClick}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 shrink-0 transition-colors',
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Menu */}
      <div className='border-sidebar-border border-t p-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='hover:bg-sidebar-accent h-auto w-full justify-start px-3 py-3 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div className='bg-primary text-primary-foreground ring-primary/20 flex h-8 w-8 items-center justify-center rounded-full ring-2'>
                  <User className='h-4 w-4' />
                </div>
                <div className='flex-1 text-left'>
                  <p className='text-sm font-medium'>Admin User</p>
                  <p className='text-muted-foreground text-xs'>
                    admin@watheta.com
                  </p>
                </div>
                <ChevronDown className='text-muted-foreground h-4 w-4' />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive'>
              <LogOut className='mr-2 h-4 w-4' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SidebarContent;
