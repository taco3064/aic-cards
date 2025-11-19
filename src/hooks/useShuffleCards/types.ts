import type { CardMeta, CardSize, useCardsState } from '../useCardsState';

type CardsState<Meta extends CardMeta> = Pick<
  ReturnType<typeof useCardsState<Meta>>,
  'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
>;

type ShuffleMode = 'OVERHAND' | 'RIFFLE';

export type ShuffleHandlers<Meta extends CardMeta> = Record<
  ShuffleMode,
  (cards: Meta[], elements: Element[], utils: Utils<Meta>) => Promise<Meta[]>
>;

export interface ShuffleCardsOptions<Meta extends CardMeta> extends CardsState<Meta> {
  duration: number;
  size: CardSize<'component'>;
}

export type UseShuffleHandler = <Meta extends CardMeta>(
  options: Omit<ShuffleCardsOptions<Meta>, 'cards' | 'getCardElements' | 'onCardsChange'>,
) => ShuffleHandlers<Meta>[ShuffleMode];

export interface Utils<Meta extends CardMeta> {
  release: (cards: Meta[]) => number;

  cut: (
    cards: Meta[],
    elements: Element[],
    start: number,
    deleteCount?: number,
  ) => {
    total: number;
    cards: Meta[];
    elements: Element[];
  };
}
