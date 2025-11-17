import type { JsonObject } from 'type-fest';
import type { useAnimate } from 'motion/react';

type SizeFields = 'width' | 'height';

export type AnimateFn = ReturnType<typeof useAnimate>[1];

export interface CardMeta extends JsonObject {
  id: string | number;
}

export type CardSize<T extends 'component' | 'styled'> = Record<
  T extends 'component' ? SizeFields : `$${SizeFields}`,
  number
>;

export interface CardOptions {
  size: CardSize<'component'>;
  total: number;
  generateMeta: (index: number) => CardMeta;
}

export interface CardStateOptions extends Pick<CardOptions, 'total' | 'generateMeta'> {
  selector: string;
}

export type HandleCardsChange = (state: CardMeta[] | true) => void;
