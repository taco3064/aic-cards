import type { AnimationScope } from 'motion/react';
import type { CardMeta } from './types';

export function createCards<Meta extends CardMeta>(data: Meta[]): Meta[] {
  const cards = [...data];

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

export function getCardElements<ScopeEl extends HTMLElement, CardEl extends HTMLElement>(
  deckRef: AnimationScope<ScopeEl>,
  selector: string,
) {
  if (!deckRef.current) {
    throw new Error('Scope element is not defined');
  }

  return Array.from(deckRef.current.querySelectorAll<CardEl>(selector));
}
