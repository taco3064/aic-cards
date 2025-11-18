import { useMemo, useState } from 'react';

import useOverhand from './useOverhand';
import useRiffle from './useRiffle';
import type { CardMeta } from '../useCardsState';

import type {
  ShuffleCardsOptions,
  ShuffleHandler,
  ShuffleMode,
  ShuffleUtils,
} from './types';

export function useShuffleCards<Meta extends CardMeta>({
  getCardElements,
  onCardsChange,
  ...options
}: ShuffleCardsOptions<Meta>) {
  const [shuffling, setShuffling] = useState(false);

  const handlers: Record<ShuffleMode, ShuffleHandler<Meta>> = {
    overhand: useOverhand(options),
    riffle: useRiffle(options),
  };

  const utils: ShuffleUtils<Meta> = useMemo(
    () => ({
      release(cards) {
        const base = Math.ceil(cards.length / 5);

        return Math.ceil(Math.random() * base);
      },
      cut(cards, elements, start, deleteCount = cards.length) {
        if (cards.length !== elements.length) {
          throw new Error('Cards and elements length mismatch');
        }

        return {
          total: deleteCount - start,
          cards: cards.splice(start, deleteCount),
          elements: elements.splice(start, deleteCount),
        };
      },
    }),
    [],
  );

  return {
    shuffling,

    async onShuffle(mode: ShuffleMode) {
      const shuffle = handlers[mode];

      setShuffling(true);
      onCardsChange(await shuffle(getCardElements(), utils));
      setShuffling(false);
    },
  };
}
