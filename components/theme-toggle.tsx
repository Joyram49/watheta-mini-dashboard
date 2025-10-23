'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Handle theme toggle with proper fallback
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      className='w-9 px-0'
      onClick={handleThemeToggle}
    >
      {theme === 'light' ? (
        <Moon className='h-4 w-4' />
      ) : (
        <Sun className='h-4 w-4' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
