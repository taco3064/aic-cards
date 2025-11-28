import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

export default [
  {
    path: '/',
    Component: lazy(() => import('~app/layouts/CardsLayout')),
    children: [
      {
        path: '/',
        Component: lazy(() => import('./Home')),
      },
      {
        path: 'example',
        Component: lazy(() => import('./Example')),
      },
    ],
  },
] satisfies RouteObject[];
