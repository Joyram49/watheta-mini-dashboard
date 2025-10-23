import React from 'react';

import { ShoppingCart, Package, Users, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

export default function OrdersPage() {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Pending Orders',
      value: '56',
      change: '+3%',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Completed Orders',
      value: '1,178',
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Total Customers',
      value: '892',
      change: '+15%',
      changeType: 'positive' as const,
      icon: Users,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      product: 'Premium Widget',
      amount: '$299.99',
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      product: 'Basic Widget',
      amount: '$99.99',
      status: 'pending',
      date: '2024-01-14',
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      product: 'Deluxe Widget',
      amount: '$499.99',
      status: 'shipped',
      date: '2024-01-13',
    },
    {
      id: 'ORD-004',
      customer: 'Alice Brown',
      product: 'Premium Widget',
      amount: '$299.99',
      status: 'completed',
      date: '2024-01-12',
    },
    {
      id: 'ORD-005',
      customer: 'Charlie Wilson',
      product: 'Basic Widget',
      amount: '$99.99',
      status: 'cancelled',
      date: '2024-01-11',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant='default' className='bg-green-100 text-green-800'>
            Completed
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant='default' className='bg-yellow-100 text-yellow-800'>
            Pending
          </Badge>
        );
      case 'shipped':
        return (
          <Badge variant='default' className='bg-blue-100 text-blue-800'>
            Shipped
          </Badge>
        );
      case 'cancelled':
        return <Badge variant='destructive'>Cancelled</Badge>;
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <PageHeader title='Orders' description='Manage and track your orders'>
        <Button>
          <ShoppingCart className='mr-2 h-4 w-4' />
          New Order
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <stat.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-muted-foreground text-xs'>
                <span className='text-green-600'>{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {recentOrders.map(order => (
              <div
                key={order.id}
                className='hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors'
              >
                <div className='flex items-center space-x-4'>
                  <div className='min-w-0 flex-1'>
                    <p className='text-foreground text-sm font-medium'>
                      {order.id}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      {order.customer} • {order.product}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='text-right'>
                    <p className='text-sm font-medium'>{order.amount}</p>
                    <p className='text-muted-foreground text-xs'>
                      {order.date}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
