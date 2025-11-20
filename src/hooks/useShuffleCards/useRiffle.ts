import { usePresetAnimate } from '../usePresetAnimate';
import type { UseShuffleHandler } from './types';

const useRiffle: UseShuffleHandler = ({ cards, duration, size, animate }) => {
  const presetAnim = usePresetAnimate(animate, { duration: duration / 2 });
  const total = cards.length;
  const displX = size.width * 0.6;

  return async (elements, { release, cut }) => {
    const result: typeof cards = [];
    let [left, right] = cut(cards, elements, Math.ceil(cards.length / 2));

    //* 把牌堆分為左右兩半並往外撥開
    await Promise.allSettled([
      ...left.elements.map((el, i) =>
        presetAnim(el, { x: [0, -displX], z: [total - i, total * 2 + i] }),
      ),
      ...right.elements.map((el, i) =>
        presetAnim(el, {
          x: [0, displX],
          z: [total - (i + left.total), total * 2 + i],
        }),
      ),
    ]);

    //* 左右兩邊的牌交錯落下
    while (left.elements.length || right.elements.length) {
      const [fallLeft, pinchedLeft] = cut(left.cards, left.elements, -release(cards));
      const [fallRight, pinchedRight] = cut(right.cards, right.elements, -release(cards));

      await Promise.allSettled(
        fallLeft.elements.reverse().map((el, i) => {
          const z = { fm: total * 2 + i, to: result.length + i };

          return presetAnim(el, { x: [-displX, 0], z: [z.fm, z.to] });
        }),
      );

      await Promise.allSettled(
        fallRight.elements.reverse().map((el, i) => {
          const z = { fm: total * 2 + i, to: result.length + fallLeft.total + i };

          return presetAnim(el, { x: [displX, 0], z: [z.fm, z.to] });
        }),
      );

      left = pinchedLeft;
      right = pinchedRight;
      result.unshift(...fallRight.cards, ...fallLeft.cards);
    }

    return result;
  };
};

export default useRiffle;
