import { useState } from 'react';

import { usePresetAnimate } from '../usePresetAnimate';
import type { CardMeta } from '../useCardsState';
import type { CardPosition, DrawCardsOptions } from './types';

export function useDrawCards<Meta extends CardMeta>({
  enabled,
  maxDrawCount,
  size,
  animate,
}: DrawCardsOptions<Meta>) {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });
  const { getPosition, getSlideOutPosition } = useCardPosition(size);
  const [draweds, setDraweds] = useState<Meta[]>([]);

  return {
    drawable: enabled && draweds.length < maxDrawCount,
    draweds,

    onDrawReset: () => setDraweds([]),
    onDraw: async (el: HTMLElement, card: Meta) => {
      const drawed = draweds.includes(card);
      const drawable = enabled && draweds.length < maxDrawCount;

      if (drawable && !drawed) {
        const position = getPosition(el);

        el.dataset.position = JSON.stringify(position);
        setDraweds([...draweds, card]);
        await $animate(el, getSlideOutPosition(el, position));
      } else if (drawed) {
        const position = JSON.parse(el.dataset.position || '{}') as CardPosition;

        setDraweds(draweds.filter((drawed) => drawed !== card));
        await $animate(el, position);
      }
    },
  };
}

function useCardPosition(size: CardSize<'component'>) {
  return {
    getPosition(el: HTMLElement): CardPosition {
      const { transform } = window.getComputedStyle(el);
      const matrix = new DOMMatrix(transform);

      return { x: matrix.e, y: matrix.f };
    },
    getSlideOutPosition(el: HTMLElement, { x, y }: CardPosition): CardPosition {
      const { transform } = window.getComputedStyle(el);
      const matrix = new DOMMatrix(transform);
      const rotate = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
      const rad = (rotate * Math.PI) / 180;
      const dist = size.height * 0.1;

      return {
        x: x + Math.sin(rad) * dist,
        y: y - Math.cos(rad) * dist,
      };
    },
  };
}
