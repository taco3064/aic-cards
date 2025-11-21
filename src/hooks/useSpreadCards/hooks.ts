import { useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import type { AnimationMode, SpreadAnimations, SpreadCardsOptions } from './types';
import type { CardMeta } from '../useCardsState';

export function useSpreadCards<Meta extends CardMeta>({
  getCardElements,
  ...options
}: SpreadCardsOptions<Meta>) {
  const [spreadMode, setSpreadMode] = useState<AnimationMode>();
  const [spreading, setSpreading] = useState(false);

  const animations: SpreadAnimations = {
    ARCHED_RIBBON: useArchedRibbon(options),
  };

  return {
    spreaded: Boolean(spreadMode),
    spreading,

    onSpreadReset: () => setSpreadMode(undefined),
    onSpread: async (mode = spreadMode) => {
      if (!mode) return;
      const elements = getCardElements();
      const animation = animations[mode];

      setSpreadMode(mode);
      setSpreading(true);
      await animation(elements);
      setSpreading(false);
    },
  };
}
