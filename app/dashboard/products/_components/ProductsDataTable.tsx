'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { Product } from '@/types/products';

import DeliveryProgress from './DeliveryProgress';
import SatisfactionIndicator from './SatisfactionIndicator';
import StatusBadge from './StatusBadge';
import StockIndicator from './StockIndicator';

interface ProductsDataTableProps {
  data: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
}

export function ProductsDataTable({
  data,
  onEdit,
  onDelete,
  onView,
}: ProductsDataTableProps) {
  const columns: ColumnDef<Product>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'product_name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Product Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className='flex items-center space-x-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100'>
              <Avatar>
                <AvatarImage src={product.image} />
                <AvatarFallback>
                  {product.product_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className='font-medium'>{product.product_name}</div>
              <div className='text-sm text-gray-500'>{product.product_sku}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'product_category',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Category
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <Badge variant='outline' className='capitalize'>
            {row.getValue('product_category')}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price);
        return <div className='font-medium'>{formatted}</div>;
      },
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Stock
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        return (
          <div className='flex items-center space-x-2'>
            <span className='font-medium'>{stock}</span>
            <StockIndicator stock={stock} />
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <StatusBadge status={row.getValue('status')} />;
      },
    },
    {
      id: 'satisfaction',
      header: 'Satisfaction',
      cell: ({ row }) => {
        return <SatisfactionIndicator productId={row.original.id} />;
      },
    },
    {
      id: 'delivery',
      header: 'Delivery',
      cell: ({ row }) => {
        return <DeliveryProgress productId={row.original.id} />;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

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
                  const success = await copyToClipboard(product.id);
                  if (success) {
                    toast.success('Product ID copied to clipboard');
                  } else {
                    toast.error('Failed to copy product ID');
                  }
                }}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView?.(product)}>
                <Eye className='mr-2 h-4 w-4' />
                View product
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(product)}>
                <Edit className='mr-2 h-4 w-4' />
                Edit product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(product)}
                className='text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
