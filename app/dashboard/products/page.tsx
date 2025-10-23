import React from 'react';

import { Package, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/ui/page-header';

export default function ProductsPage() {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Products',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Active Products',
      value: '1,180',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Out of Stock',
      value: '54',
      change: '-3%',
      changeType: 'negative' as const,
      icon: Package,
    },
    {
      title: 'Low Stock',
      value: '23',
      change: '+2%',
      changeType: 'positive' as const,
      icon: Package,
    },
  ];

  const products = [
    {
      id: 'PROD-001',
      name: 'Premium Widget',
      category: 'Electronics',
      price: '$299.99',
      stock: 45,
      status: 'active',
      image: '/placeholder-product.jpg',
    },
    {
      id: 'PROD-002',
      name: 'Basic Widget',
      category: 'Electronics',
      price: '$99.99',
      stock: 0,
      status: 'out_of_stock',
      image: '/placeholder-product.jpg',
    },
    {
      id: 'PROD-003',
      name: 'Deluxe Widget',
      category: 'Electronics',
      price: '$499.99',
      stock: 12,
      status: 'low_stock',
      image: '/placeholder-product.jpg',
    },
    {
      id: 'PROD-004',
      name: 'Standard Widget',
      category: 'Electronics',
      price: '$199.99',
      stock: 78,
      status: 'active',
      image: '/placeholder-product.jpg',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant='default' className='bg-green-100 text-green-800'>
            Active
          </Badge>
        );
      case 'out_of_stock':
        return <Badge variant='destructive'>Out of Stock</Badge>;
      case 'low_stock':
        return (
          <Badge variant='default' className='bg-yellow-100 text-yellow-800'>
            Low Stock
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <PageHeader
        title='Products'
        description='Manage your product inventory and catalog'
      >
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Add Product
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map(stat => (
          <Card key={stat.title} className='transition-shadow hover:shadow-md'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-muted-foreground text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <stat.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-muted-foreground text-xs'>
                <span
                  className={
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Product Inventory</CardTitle>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                <Input
                  placeholder='Search products...'
                  className='w-64 pl-10'
                />
              </div>
              <Button variant='outline' size='sm'>
                <Filter className='mr-2 h-4 w-4' />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {products.map(product => (
              <div
                key={product.id}
                className='hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors'
              >
                <div className='flex items-center space-x-4'>
                  <div className='bg-muted flex h-12 w-12 items-center justify-center rounded-lg'>
                    <Package className='text-muted-foreground h-6 w-6' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-foreground text-sm font-medium'>
                      {product.name}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      {product.category} • {product.id}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='text-right'>
                    <p className='text-sm font-medium'>{product.price}</p>
                    <p className='text-muted-foreground text-xs'>
                      {product.stock} in stock
                    </p>
                  </div>
                  {getStatusBadge(product.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className='text-destructive'>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
