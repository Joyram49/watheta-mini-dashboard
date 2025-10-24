'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Order } from '@/types/orders';

import { copyToClipboard } from '../../../../lib/utils/clipboard';
import DeliveryProgress from '../../products/_components/DeliveryProgress';

import CustomerFeedback from './CustomerFeedback';

interface OrdersDataTableProps {
  data: Order[];
  onEdit?: (product: Order) => void;
  onDelete?: (product: Order) => void;
  onView?: (product: Order) => void;
}

export function OrdersDataTable({
  data,
  onEdit,
  onDelete,
  onView,
}: OrdersDataTableProps) {
  // Columns Definition
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'order_id',
      header: 'Order ID',
      cell: ({ row }) => (
        <span className='font-medium'>{row.getValue('order_id')}</span>
      ),
    },
    {
      accessorKey: 'client_name',
      header: 'Client Name',
      cell: ({ row }) => {
        const name = row.getValue('client_name') as string;
        const initials = name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        return (
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8'>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'payment_status',
      header: 'Payment Status',
      cell: ({ row }) => {
        const status = row.getValue('payment_status') as string;
        const color =
          status === 'paid'
            ? 'bg-green-100 text-green-700'
            : status === 'pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700';
        return <Badge className={color}>{status}</Badge>;
      },
    },
    {
      accessorKey: 'delivery_status',
      header: 'Delivery Status',
      cell: ({ row }) => {
        const status = row.getValue('delivery_status') as string;
        const color =
          status === 'delivered'
            ? 'bg-green-500'
            : status === 'shipped'
              ? 'bg-blue-500'
              : 'bg-gray-400';
        return (
          <div className='flex items-center gap-2'>
            <div className={`h-2 w-2 rounded-full ${color}`} />
            <span className='capitalize'>{status}</span>
          </div>
        );
      },
    },
    {
      id: 'total_amount',
      header: 'Total Amount',
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        const products = row.original.products;
        const total = quantity * products.length;
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(total);
        return <span>{formatted}</span>;
      },
    },
    {
      accessorKey: 'delivery_progress',
      header: 'Delivery Graph',
      cell: ({ row }) => {
        const value = row.original.order_id;
        return <DeliveryProgress productId={value} />;
      },
    },
    {
      id: 'customer_feedback',
      header: 'Feedback',
      cell: () => {
        return <CustomerFeedback />;
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => {
        const timestamp = row.getValue('created_at') as number;
        const date = new Date(timestamp * 1000);
        const formatted = format(date, 'dd MMM, yyyy');
        return <span>{formatted}</span>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={async () => {
                  const success = await copyToClipboard(order.id);
                  if (success) {
                    toast.success('Order ID copied to clipboard');
                  } else {
                    toast.error('Failed to copy order ID');
                  }
                }}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView?.(order)}>
                <Eye className='mr-2 h-4 w-4' />
                View order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(order)}>
                <Edit className='mr-2 h-4 w-4' />
                Edit order
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(order)}
                className='text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
}
