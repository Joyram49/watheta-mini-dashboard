'use client';

import { useMemo, useState } from 'react';

import { Package, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProducts } from '@/lib/hooks/useProducts';
import { Product } from '@/types/products';

import { DeleteProductModal } from './_components/DeleteProductModal';
import { EditProductModal } from './_components/EditProductModal';
import { ProductsDataTable } from './_components/ProductsDataTable';
import { ProductsFilters } from './_components/ProductsFilters';
import { ViewProductModal } from './_components/ViewProductModal';

export default function ProductsPage() {
  const router = useRouter();
  const { data: products = [], isLoading, error } = useProducts();
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priceRange: [0, 1000] as [number, number],
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewProductId, setViewProductId] = useState<string | null>(null);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const matchesCategory =
        !filters.category || product.product_category === filters.category;
      const matchesStatus =
        !filters.status || product.status === filters.status;
      const matchesPriceRange =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return matchesCategory && matchesStatus && matchesPriceRange;
    });
  }, [products, filters]);

  // Extract unique categories and statuses for filters
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((p: Product) => p.product_category)),
    ];
    return uniqueCategories.sort();
  }, [products]);

  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(products.map((p: Product) => p.status))];
    return uniqueStatuses.sort();
  }, [products]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p: Product) => p.price), 1000);
  }, [products]);

  const handleEditProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProductId(null);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setViewProductId(product.id);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewProductId(null);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className='space-y-6'>
        <PageHeader
          title='Products'
          description='Manage your product inventory'
        />
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <Package className='text-muted-foreground mb-4 h-12 w-12' />
            <h3 className='mb-2 text-lg font-semibold'>
              Failed to load products
            </h3>
            <p className='text-muted-foreground mb-4 text-center'>
              There was an error loading your products. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Products' description='Manage your product inventory'>
        <Button onClick={() => router.push('/dashboard/products/create')}>
          <Plus className='mr-2 h-4 w-4' />
          Add Product
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Products
            </CardTitle>
            <Package className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{products.length}</div>
            <p className='text-muted-foreground text-xs'>
              {filteredProducts.length} after filtering
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Products
            </CardTitle>
            <div className='h-4 w-4 rounded-full bg-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {products.filter((p: Product) => p.status === 'active').length}
            </div>
            <p className='text-muted-foreground text-xs'>Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Low Stock</CardTitle>
            <div className='h-4 w-4 rounded-full bg-yellow-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {
                products.filter((p: Product) => p.stock < 10 && p.stock > 0)
                  .length
              }
            </div>
            <p className='text-muted-foreground text-xs'>Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Out of Stock</CardTitle>
            <div className='h-4 w-4 rounded-full bg-red-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {products.filter((p: Product) => p.stock === 0).length}
            </div>
            <p className='text-muted-foreground text-xs'>No inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <ProductsFilters
        onFiltersChange={handleFiltersChange}
        categories={categories}
        statuses={statuses}
        maxPrice={maxPrice}
      />

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <div className='p-6'>
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
                <p className='text-muted-foreground'>Loading products...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12'>
              <Package className='text-muted-foreground mb-4 h-12 w-12' />
              <h3 className='mb-2 text-lg font-semibold'>
                {products.length === 0
                  ? 'No products yet'
                  : 'No products match your filters'}
              </h3>
              <p className='text-muted-foreground mb-4 text-center'>
                {products.length === 0
                  ? 'Get started by adding your first product to your inventory.'
                  : 'Try adjusting your filters to see more products.'}
              </p>
              {products.length === 0 && (
                <Button
                  onClick={() => router.push('/dashboard/products/create')}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Add Your First Product
                </Button>
              )}
            </div>
          ) : (
            <ProductsDataTable
              data={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onView={handleViewProduct}
            />
          )}
        </div>
      </Card>

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        productId={selectedProductId}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        product={selectedProduct}
      />

      {/* View Product Modal */}
      <ViewProductModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        productId={viewProductId}
      />
    </div>
  );
}
