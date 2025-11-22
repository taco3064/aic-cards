import { split } from './utils';
import { useBreakpointMatches } from '../useBreakpoint';
import { usePresetAnimate } from '../useCardsAnimate';
import type { UseSpreadAnimate } from './types';

const useArchedRibbon: UseSpreadAnimate = ({ size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.01 });
  const { matched: rows } = useBreakpointMatches({ xs: 6, sm: 4, md: 2, lg: 1 });
  const { matched: spreadDeg } = useBreakpointMatches({ xs: 20, sm: 45, md: 60 });
  const { matched: radiusMultiplier } = useBreakpointMatches({ xs: 4, md: 8, lg: 12 });

  const displY = size.height * 0.3;

  return async (elements) => {
    let startY = -displY * (rows / 4);
    let slotIndex = 0;

    for (const rowEls of split(elements, rows)) {
      const count = rowEls.length;
      const spreadRad = (spreadDeg * Math.PI) / 180;
      const radius = displY * radiusMultiplier; // 半徑：越大越彎，可以再調

      const step = count > 1 ? spreadRad / (count - 1) : 0;
      const startAngle = -spreadRad / 2;

      for (let i = 0; i < count; i++) {
        const theta = startAngle + step * i;

        await $animate(elements.slice(0, elements.length - slotIndex++), {
          x: Math.sin(theta) * radius,
          y: startY - (Math.cos(theta) * radius - radius),
          rotate: ((theta * 180) / Math.PI) * 0.9,
        });
      }

      startY += displY;
    }
  };
};

export default useArchedRibbon;
