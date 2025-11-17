import type { useCardsState } from '../useCardsState';
import type { CardMeta, CardSize } from '../useCardsState';

type CardsState = Pick<
  ReturnType<typeof useCardsState>,
  'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
>;

export type ShuffleMode = 'overhand' | 'riffle';

export type ShuffleUtils = {
  getRelease: (cards: CardMeta[]) => number;

  getSplited: (
    cards: CardMeta[],
    elements: Element[],
    start: number,
    deleteCount?: number,
  ) => {
    total: number;
    cards: CardMeta[];
    elements: Element[];
  };
};

export interface ShuffleCardsOptions extends CardsState {
  size: CardSize<'component'>;
  duration: number;
}

export type ShuffleHandlerHook = (
  options: Omit<ShuffleCardsOptions, 'onCardsChange'>,
  utils: ShuffleUtils,
) => () => Promise<CardMeta[]>;
