import { useClientOnly } from '@/lib/hooks/useClientOnly';

const SatisfactionIndicator = ({ productId }: { productId: string }) => {
  const isClient = useClientOnly();

  if (!isClient) {
    return <div className='h-6 w-20 animate-pulse rounded bg-gray-200' />;
  }

  // Generate a consistent satisfaction score based on product ID hash
  const hash = productId.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  const satisfaction = (Math.abs(hash) % 40) + 60; // 60-100%

  const getSatisfactionColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className='flex items-center space-x-2'>
      <div className='text-sm font-medium'>
        <span className={getSatisfactionColor(satisfaction)}>
          {satisfaction}%
        </span>
      </div>
      <div className='h-2 w-16 rounded-full bg-gray-200'>
        <div
          className={`h-2 rounded-full ${
            satisfaction >= 90
              ? 'bg-green-500'
              : satisfaction >= 80
                ? 'bg-blue-500'
                : satisfaction >= 70
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
          }`}
          style={{ width: `${satisfaction}%` }}
        />
      </div>
    </div>
  );
};

export default SatisfactionIndicator;
