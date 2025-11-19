import type { SetRequired } from 'type-fest';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Breakpoints = Record<Breakpoint, number>;
export type BreakpointValues<T> = SetRequired<{ [K in Breakpoint]?: T }, 'xs'>;

export type BreakpointMatches<T> = {
  breakpoint: Breakpoint;
  matched: T;
};
