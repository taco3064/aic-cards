import type { CardMeta, CardSize, useCardsState } from '../useCardsState';

type CardsState<Meta extends CardMeta> = Pick<
  ReturnType<typeof useCardsState<Meta>>,
  'cards' | 'animate' | 'getCardElements'
>;

export type SpreadHandlers = Record<
  'ARCHED_RIBBON',
  (elements: Element[]) => Promise<void>
>;

export interface SpreadCardsOptions<Meta extends CardMeta> extends CardsState<Meta> {
  duration: number;
  size: CardSize<'component'>;
}

export type UseSpreadHandler = <Meta extends CardMeta>(
  options: Omit<SpreadCardsOptions<Meta>, 'getCardElements'>,
) => SpreadHandlers[keyof SpreadHandlers];
