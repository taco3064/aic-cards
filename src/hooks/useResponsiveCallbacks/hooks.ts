import { useEffect, useImperativeHandle, useRef } from 'react';

import { useBreakpoint } from '../useBreakpoint';
import type { ResponsiveCallback } from './types';

export function useResponsiveCallbacks(
  mode: 'parallel' | 'sequential',
  callbacks: ResponsiveCallback[],
  enabled = true,
) {
  const breakpoint = useBreakpoint();
  const callbacksRef = useRef<ResponsiveCallback[]>(null);

  useImperativeHandle(callbacksRef, () => (enabled ? callbacks : []), [
    callbacks,
    enabled,
  ]);

  useEffect(() => {
    if (!callbacksRef.current) return;
    const callbacks = callbacksRef.current;

    (async () => {
      if (mode === 'sequential') {
        for (const callback of callbacks) {
          await callback();
        }
      } else {
        Promise.all(callbacks.map((callback) => callback()));
      }
    })();
  }, [breakpoint, mode]);
}
