import { usePresetAnimate } from '../useCardsAnimate';
import type { UseSpreadAnimate } from './types';

const useHandFan: UseSpreadAnimate = ({ size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.2 });
  const spreadDeg = 7;
  const radiusMultiplier = 6;
  const displY = size.height * 0.3;

  return async (elements) => {
    const spreadRad = (spreadDeg * Math.PI) / 180;
    const startY = -displY * 0.25;
    const radius = displY * radiusMultiplier; // 半徑：越大越彎，可以再調

    for (let i = 0; i < elements.length; i++) {
      const step = elements.length > 1 ? spreadRad / (elements.length - 1) : 0;
      const theta = -spreadRad / 2 + i * step;

      await $animate(elements.slice(0, elements.length - i), {
        x: Math.sin(theta) * radius,
        y: startY - (Math.cos(theta) * radius - radius),
        rotate: ((theta * 180) / Math.PI) * 0.9,
      });
    }
  };
};

export default useHandFan;
