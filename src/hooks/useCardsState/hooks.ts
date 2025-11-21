import { useAnimate } from 'motion/react';
import { useState } from 'react';

import { createCards, getCardElements } from './utils';
import type { CardMeta, CardsState } from './types';

export function useCardsState<
  Meta extends CardMeta,
  ScopeEl extends HTMLElement = HTMLElement,
  CardEl extends HTMLElement = HTMLElement,
>(data: Meta[], selector: string = ':scope > *'): CardsState<Meta, ScopeEl, CardEl> {
  const [deckRef, animate] = useAnimate<ScopeEl>();
  const [cards, setCards] = useState(() => createCards(data));

  return {
    cards,
    deckRef,

    animate,
    getCardElements: () => getCardElements(deckRef, selector),
    onCardsChange: setCards,
    onCardsReset: async () => {
      const elements = getCardElements(deckRef, selector);

      await animate(elements, { x: 0, y: 0, rotate: 0 });
      setCards(() => createCards(data));
    },
  };
}
