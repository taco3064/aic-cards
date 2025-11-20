import type { AnimationScope } from 'motion/react';
import type { JsonObject } from 'type-fest';

import type { Animate } from '../usePresetAnimate';

export interface CardMeta extends JsonObject {
  id: string | number;
}

export interface CardsState<Meta extends CardMeta, ScopeEl extends Element = Element> {
  cards: Meta[];
  deckRef: AnimationScope<ScopeEl>;

  animate: Animate;
  getCardElements: () => Element[];
  onCardsChange: (cards: Meta[]) => void;
  onCardsReset: () => void;
}
