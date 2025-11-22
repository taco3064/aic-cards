import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import useHandFan from './useHandFan';
import useStraight from './useStraight';
import type { SpreadMode, SpreadOptions } from './types';

export function useSpreadCards({ cardsRef, ...options }: SpreadOptions) {
  const [spreadMode, setSpreadMode] = useState<SpreadMode>();
  const [spreading, setSpreading] = useState(false);

  const animations = {
    HAND_FAN: useHandFan(options),
    ARCHED_RIBBON: useArchedRibbon(options),
    STRAIGHT: useStraight(options),
  };

  return {
    spreaded: Boolean(spreadMode),
    spreading,

    onSpreadReset: () => setSpreadMode(undefined),
    onSpread: async (mode = spreadMode) => {
      if (!mode) return;
      const animation = animations[mode];

      setSpreadMode(mode);
      setSpreading(true);
      await animation(cardsRef.current);
      setSpreading(false);
    },
  };
}

export function useAutoSpread(
  spreadMode: SpreadMode,
  onSpread: ReturnType<typeof useSpreadCards>['onSpread'],
) {
  const spreadRef = useRef<typeof onSpread>(null);

  useImperativeHandle(spreadRef, () => onSpread, [onSpread]);

  useEffect(() => {
    if (spreadMode) {
      spreadRef.current?.(spreadMode);
    }
  }, [spreadMode]);
}
