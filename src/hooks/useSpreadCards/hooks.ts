import { useState } from 'react';

import { useBreakpoint } from '../useBreakpoint';
import type { CardMeta } from '../useCardsState';
import type { SpreadCardsOptions } from './types';

export function useSpreadCards<Meta extends CardMeta>({
  cards,
  animate,
}: SpreadCardsOptions<Meta>) {
  const [spreading, setSpreading] = useState(false);
  const breakpoint = useBreakpoint();

  return {
    spreading,

    async onSpread() {
      setSpreading(true);
      console.log(breakpoint, cards, animate);

      await new Promise((resolve) => setTimeout(resolve, 500));
      setSpreading(false);
    },
  };
}
