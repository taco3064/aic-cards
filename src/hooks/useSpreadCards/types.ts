import type { CardMeta, useCardsState } from '../useCardsState';

type CardsState<Meta extends CardMeta> = Pick<
  ReturnType<typeof useCardsState<Meta>>,
  'cards' | 'animate' | 'getCardElements'
>;

export interface SpreadCardsOptions<Meta extends CardMeta> extends CardsState<Meta> {
  duration: number;
}
