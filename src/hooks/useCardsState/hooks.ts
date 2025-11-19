import { useAnimate } from 'motion/react';
import { useState } from 'react';
import type { CardMeta, CardsStateOptions } from './types';

export function useCardsState<
  Meta extends CardMeta,
  ScopeEl extends Element = Element,
  CardEl extends Element = Element,
>({ selector, total, generateMeta }: CardsStateOptions<Meta>) {
  const init = useInitCards<Meta>({ total, generateMeta });
  const [deckRef, animate] = useAnimate<ScopeEl>();
  const [cards, setCards] = useState(init);

  return {
    cards,
    deckRef,

    animate,
    onCardsChange: setCards,
    onReset: () => setCards(init),
    getCardElements() {
      if (!deckRef.current) {
        throw new Error('Scope element is not defined');
      }

      return Array.from(deckRef.current.querySelectorAll<CardEl>(selector));
    },
  };
}

function useInitCards<Meta extends CardMeta>({
  total,
  generateMeta,
}: Pick<CardsStateOptions<Meta>, 'total' | 'generateMeta'>) {
  return () => {
    const cards = Array.from({ length: total }).map((_, i) => generateMeta(i));

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  };
}
