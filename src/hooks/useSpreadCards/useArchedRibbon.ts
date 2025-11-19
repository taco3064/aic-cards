import { useBreakpointMatches } from '../useBreakpoint';
import { usePresetAnimate } from '../usePresetAnimate';
import type { UseSpreadHandler } from './types';

const useArchedRibbon: UseSpreadHandler = ({ cards, duration, animate }) => {
  const presetAnim = usePresetAnimate(animate, { duration });
  const { matched: rows } = useBreakpointMatches({ xs: 4, sm: 3, md: 2, lg: 1 });

  return async (elements) => {
    console.log(elements, cards, rows, presetAnim);
  };
};

export default useArchedRibbon;
