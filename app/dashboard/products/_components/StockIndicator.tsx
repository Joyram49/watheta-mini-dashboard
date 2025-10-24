const StockIndicator = ({ stock }: { stock: number }) => {
  if (stock < 10) {
    return (
      <div className='flex items-center space-x-2'>
        <div className='h-2 w-2 rounded-full bg-red-500' />
        <span className='text-sm text-red-600'>Out of Stock</span>
      </div>
    );
  }
  if (stock < 50) {
    return (
      <div className='flex items-center space-x-2'>
        <div className='h-2 w-2 rounded-full bg-yellow-500' />
        <span className='text-sm text-yellow-600'>Low Stock</span>
      </div>
    );
  }
  return (
    <div className='flex items-center space-x-2'>
      <div className='h-2 w-2 rounded-full bg-green-500' />
      <span className='text-sm text-green-600'>In Stock</span>
    </div>
  );
};

export default StockIndicator;
