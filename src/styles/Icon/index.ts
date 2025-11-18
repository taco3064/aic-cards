import type { ComponentProps } from 'react';
import Icon from './Styled';

export default Icon;

export type IconBaseProps = Omit<
  ComponentProps<typeof Icon.Base>,
  'children' | 'viewBox'
>;
