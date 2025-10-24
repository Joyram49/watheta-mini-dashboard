import { useEffect, useLayoutEffect } from 'react';

/**
 * Use layout effect on client, regular effect on server
 * Prevents hydration mismatches
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
