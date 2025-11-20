import { usePresetAnimate } from '../usePresetAnimate';
import type { CuttedDeck, UseShuffleHandler } from './types';

const useOverhand: UseShuffleHandler = ({ cards, duration, size, animate }) => {
  const presetAnim = usePresetAnimate(animate, { duration });
  const total = cards.length;
  const displY = size.height * 1.2;

  return async (elements, { release, cut }) => {
    const result: typeof cards = [];
    let deck: CuttedDeck<(typeof cards)[number]> = { cards, elements, total };

    do {
      const [drawed, pinched] = cut(release(cards) + 3, deck);

      await Promise.allSettled([
        //* 捏住的牌往下掉
        ...pinched.elements.map((el, i) =>
          presetAnim(el, { z: total - (i + drawed.elements.length) }),
        ),

        //* 抽出的牌往上疊加
        ...drawed.elements.map((el, i) => {
          const z = {
            fm: total - (i + pinched.total),
            to: total - i,
          };

          return presetAnim(el, {
            y: [0, displY, displY, 0],
            z: [z.fm, z.fm, z.to, z.to],
          });
        }),
      ]);

      deck = drawed;
      result.unshift(...pinched.cards);
    } while (deck.total);

    return result;
  };
};

export default useOverhand;
