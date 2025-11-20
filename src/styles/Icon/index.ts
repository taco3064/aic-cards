import type { ComponentProps } from 'react';
import Icon from './styleds';

export default Icon;

export type IconBaseProps = Omit<
  ComponentProps<typeof Icon.Base>,
  'children' | 'viewBox'
>;
