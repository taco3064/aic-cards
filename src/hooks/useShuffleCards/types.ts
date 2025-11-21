import type { CardMeta, CardsState } from '../useCardsState';

type AnimationMode = 'OVERHAND' | 'RIFFLE';

export interface CuttedDeck<Meta extends CardMeta> {
  total: number;
  cards: Meta[];
  elements: HTMLElement[];
}

export type ShuffleAnimations<Meta extends CardMeta> = Record<
  AnimationMode,
  (elements: HTMLElement[]) => Promise<Meta[]>
>;

export interface ShuffleCardsOptions<Meta extends CardMeta>
  extends Pick<
    CardsState<Meta>,
    'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
  > {
  size: CardSize<'component'>;
}

export type UseShuffleAnimate = <Meta extends CardMeta>(
  options: Omit<ShuffleCardsOptions<Meta>, 'getCardElements' | 'onCardsChange'>,
) => ShuffleAnimations<Meta>[AnimationMode];
