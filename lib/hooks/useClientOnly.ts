import { useEffect, useState } from 'react';

/**
 * Hook to ensure component only renders on client side
 * Prevents hydration mismatches
 */
export const useClientOnly = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return isClient;
};
