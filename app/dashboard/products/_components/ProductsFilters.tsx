'use client';

import { useState } from 'react';

import { Filter, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ProductsFiltersProps {
  onFiltersChange: (filters: {
    category: string;
    status: string;
    priceRange: [number, number];
  }) => void;
  categories: string[];
  statuses: string[];
  maxPrice: number;
}

export function ProductsFilters({
  onFiltersChange,
  categories,
  statuses,
  maxPrice,
}: ProductsFiltersProps) {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priceRange: [0, maxPrice] as [number, number],
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === 'all' ? '' : value,
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      status: '',
      priceRange: [0, maxPrice] as [number, number],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = [
    filters.category,
    filters.status,
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== maxPrice,
  ].filter(Boolean).length;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsOpen(!isOpen)}
            className='relative'
          >
            <Filter className='mr-2 h-4 w-4' />
            Filters
            {activeFiltersCount > 0 && (
              <Badge
                variant='secondary'
                className='ml-2 h-5 w-5 rounded-full p-0 text-xs'
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          {activeFiltersCount > 0 && (
            <Button variant='ghost' size='sm' onClick={clearFilters}>
              <X className='mr-2 h-4 w-4' />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Filter Products</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Category Filter */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Category</label>
              <Select
                value={filters.category || 'all'}
                onValueChange={value => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='All categories' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Status</label>
              <Select
                value={filters.status || 'all'}
                onValueChange={value => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='All statuses' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={value => handleFilterChange('priceRange', value)}
                max={maxPrice}
                min={0}
                step={1}
                className='w-full'
              />
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Active Filters</label>
                <div className='flex flex-wrap gap-2'>
                  {filters.category && (
                    <Badge
                      variant='secondary'
                      className='flex items-center space-x-1'
                    >
                      <span>Category: {filters.category}</span>
                      <X
                        className='h-3 w-3 cursor-pointer'
                        onClick={() => handleFilterChange('category', '')}
                      />
                    </Badge>
                  )}
                  {filters.status && (
                    <Badge
                      variant='secondary'
                      className='flex items-center space-x-1'
                    >
                      <span>Status: {filters.status}</span>
                      <X
                        className='h-3 w-3 cursor-pointer'
                        onClick={() => handleFilterChange('status', '')}
                      />
                    </Badge>
                  )}
                  {(filters.priceRange[0] !== 0 ||
                    filters.priceRange[1] !== maxPrice) && (
                    <Badge
                      variant='secondary'
                      className='flex items-center space-x-1'
                    >
                      <span>
                        Price: ${filters.priceRange[0]} - $
                        {filters.priceRange[1]}
                      </span>
                      <X
                        className='h-3 w-3 cursor-pointer'
                        onClick={() =>
                          handleFilterChange('priceRange', [0, maxPrice])
                        }
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
