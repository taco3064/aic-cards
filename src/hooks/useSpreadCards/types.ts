import type { CardMeta, CardSize, CardsState } from '../useCardsState';

export interface CardPose {
  x: number;
  y: number;
  rotate: number;
}

export interface HandlerRef {
  spreaded?: keyof SpreadHandlers;
  handler: (mode: keyof SpreadHandlers) => Promise<void>;
}

export type SpreadHandlers = Record<
  'ARCHED_RIBBON',
  (elements: Element[], utils: Utils) => Promise<void>
>;

export interface SpreadCardsOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'cards' | 'animate' | 'getCardElements'> {
  size: CardSize<'component'>;
}

export type UseSpreadHandler = <Meta extends CardMeta>(
  options: Omit<SpreadCardsOptions<Meta>, 'getCardElements'>,
) => SpreadHandlers[keyof SpreadHandlers];

export type Utils = {
  split: <Rows extends number>(elements: Element[], rows: Rows) => Element[][];
};
