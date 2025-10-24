'use client';

import { useState } from 'react';

import { Package, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/lib/hooks/useOrders';
import { Order, TDeliveryStatus } from '@/types/orders';

import { DeleteOrderModal } from './_components/DeleteOrderModal';
import { OrdersDataTable } from './_components/OrdersDataTable';
import { ViewOrderModal } from './_components/ViewOrderModal';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders = [], isLoading, error } = useOrders();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewOrderId, setViewOrderId] = useState<string | null>(null);

  // === STATS ===
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    o => o.delivery_status === ('pending' as TDeliveryStatus)
  ).length;
  const completedOrders = orders.filter(
    o => o.delivery_status === ('delivered' as TDeliveryStatus)
  ).length;
  const cancelledOrders = orders.filter(
    o => o.delivery_status === ('cancelled' as TDeliveryStatus)
  ).length;

  // === HANDLERS ===
  const handleViewOrder = (order: Order) => {
    setViewOrderId(order.id);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewOrderId(null);
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  // === ERROR ===
  if (error) {
    return (
      <div className='space-y-6'>
        <PageHeader
          title='Orders'
          description='Manage all your customer orders'
        />
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <Package className='text-muted-foreground mb-4 h-12 w-12' />
            <h3 className='mb-2 text-lg font-semibold'>
              Failed to load orders
            </h3>
            <p className='text-muted-foreground mb-4 text-center'>
              There was an error loading your orders. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // === RENDER ===
  return (
    <div className='space-y-6'>
      {/* Header */}
      <PageHeader title='Orders' description='Manage your customer orders'>
        <Button onClick={() => router.push('/dashboard/orders/create')}>
          <Plus className='mr-2 h-4 w-4' />
          Create Order
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
            <Package className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalOrders}</div>
            <p className='text-muted-foreground text-xs'>
              Total recorded orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Orders
            </CardTitle>
            <div className='h-4 w-4 rounded-full bg-yellow-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingOrders}</div>
            <p className='text-muted-foreground text-xs'>Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Completed</CardTitle>
            <div className='h-4 w-4 rounded-full bg-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{completedOrders}</div>
            <p className='text-muted-foreground text-xs'>
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Cancelled</CardTitle>
            <div className='h-4 w-4 rounded-full bg-red-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{cancelledOrders}</div>
            <p className='text-muted-foreground text-xs'>Customer cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <div className='p-6'>
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
                <p className='text-muted-foreground'>Loading orders...</p>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12'>
              <Package className='text-muted-foreground mb-4 h-12 w-12' />
              <h3 className='mb-2 text-lg font-semibold'>No orders found</h3>
              <p className='text-muted-foreground mb-4 text-center'>
                Start by creating a new order for your customer.
              </p>
              <Button onClick={() => router.push('/dashboard/orders/create')}>
                <Plus className='mr-2 h-4 w-4' />
                Create First Order
              </Button>
            </div>
          ) : (
            <OrdersDataTable
              data={orders}
              onDelete={handleDeleteOrder}
              onView={handleViewOrder}
            />
          )}
        </div>
      </Card>

      {/* Delete Modal */}
      <DeleteOrderModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        order={selectedOrder}
      />

      {/* View Modal */}
      <ViewOrderModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        orderId={viewOrderId}
      />
    </div>
  );
}
