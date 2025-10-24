'use client';

import { Bell, Menu, Settings } from 'lucide-react';

import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopNavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function TopNavbar({
  onMenuClick,
  showMenuButton = false,
}: TopNavbarProps) {
  return (
    <div className='border-border bg-background sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-2 border-b px-6 shadow-sm sm:gap-x-4 lg:gap-x-6'>
      {/* Mobile menu button */}
      {showMenuButton && onMenuClick && (
        <Button
          variant='ghost'
          size='sm'
          className='lg:hidden'
          onClick={onMenuClick}
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Open sidebar</span>
        </Button>
      )}

      <div className='flex flex-1 justify-end gap-x-2 self-stretch sm:gap-x-4 lg:gap-x-6'>
        {/* Search bar */}
        {/* <div className='flex flex-1'>
          <div className='relative w-full max-w-sm sm:max-w-md lg:max-w-lg'>
            <Search className='text-muted-foreground absolute top-[35%] left-3 h-4 w-4 -translate-y-1/2' />
            <Input
              placeholder='Search...'
              className='bg-muted/50 border-muted-foreground/20 focus:bg-background pl-10 text-sm transition-colors'
            />
          </div>
        </div> */}

        {/* Right side items */}
        <div className='flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6'>
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button variant='ghost' size='sm' className='relative'>
            <Bell className='h-4 w-4' />
            <span className='absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
              3
            </span>
            <span className='sr-only'>Notifications</span>
          </Button>

          {/* Settings */}
          <Button variant='ghost' size='sm'>
            <Settings className='h-4 w-4' />
            <span className='sr-only'>Settings</span>
          </Button>

          {/* User avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/avatars/01.png' alt='Admin' />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm leading-none font-medium'>Admin User</p>
                  <p className='text-muted-foreground text-xs leading-none'>
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
