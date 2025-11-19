import { useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import type { CardMeta } from '../useCardsState';
import type { SpreadCardsOptions, SpreadHandlers } from './types';

export function useSpreadCards<Meta extends CardMeta>({
  getCardElements,
  ...options
}: SpreadCardsOptions<Meta>) {
  const [spreading, setSpreading] = useState(false);

  const spreads: SpreadHandlers = {
    ARCHED_RIBBON: useArchedRibbon(options),
  };

  return {
    spreading,

    async onSpread(mode: keyof SpreadHandlers) {
      const elements = getCardElements();
      const spread = spreads[mode];

      setSpreading(true);
      await spread(elements);
      setSpreading(false);
    },
  };
}
