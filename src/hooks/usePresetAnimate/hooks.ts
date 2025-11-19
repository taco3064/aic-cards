import type { AnimationOptions } from 'motion/react';
import type { Animate, PreseteAnimate } from './types';

export function usePresetAnimate(
  animate: Animate,
  options: AnimationOptions,
): PreseteAnimate {
  return (...args) => animate(...args, options);
}
