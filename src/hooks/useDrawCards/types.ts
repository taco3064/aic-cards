import type { CardMeta, CardsState } from '../useCardsState';

export type CardPosition = Record<'x' | 'y', number>;

export interface DrawCardsOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'animate'> {
  enabled: boolean;
  maxDrawCount: number;
  size: CardSize<'component'>;
}
