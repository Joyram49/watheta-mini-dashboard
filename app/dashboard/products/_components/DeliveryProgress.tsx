import { useClientOnly } from '@/lib/hooks/useClientOnly';

const DeliveryProgress = ({ productId }: { productId: string }) => {
  const isClient = useClientOnly();

  if (!isClient) {
    return <div className='h-6 w-16 animate-pulse rounded bg-gray-200' />;
  }

  // Generate a consistent delivery status based on product ID hash
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const hash = productId.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  const status = statuses[Math.abs(hash) % statuses.length];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'processing':
        return 'text-blue-600';
      case 'shipped':
        return 'text-purple-600';
      case 'delivered':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <div className={`text-sm font-medium ${getStatusColor(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
};

export default DeliveryProgress;
