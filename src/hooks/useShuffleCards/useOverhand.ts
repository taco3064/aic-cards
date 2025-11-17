import type { CardMeta } from '../useCardsState';
import type { ShuffleHandlerHook } from './types';

const useOverhand: ShuffleHandlerHook = (
  { cards, duration, size, animate, getCardElements },
  { getRelease, getSplited },
) => {
  const animateOptions = { duration };

  return async () => {
    const elements = getCardElements();
    const y = size.height * 1.2;
    const result: CardMeta[] = [];

    while (cards.length) {
      const pinched = getSplited(cards, elements, 0, getRelease(cards));

      await Promise.allSettled([
        ...pinched.elements.map((el, i) => {
          const z = { fm: -i, to: -(i + elements.length) };

          return animate(el, { y: 0, z: [z.fm, z.to] }, animateOptions);
        }),

        ...elements.map((el, i) => {
          const z = { fm: -(i + pinched.total), to: -i };

          return animate(
            el,
            { y: [0, y, y, 0], z: [z.fm, z.fm, z.to, z.to] },
            animateOptions,
          );
        }),
      ]);

      result.unshift(...pinched.cards);
    }

    result.unshift(...cards);

    return result;
  };
};

export default useOverhand;
