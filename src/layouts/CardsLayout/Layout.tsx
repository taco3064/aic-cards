import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Button from '~app/styles/Button';
import LinearProgress from '~app/components/LinearProgress';
import LogoIcon from '~app/components/icons/LogoIcon';
import Toolbar from '~app/styles/Toolbar';

export default function CardsLayout() {
  return (
    <>
      <Toolbar.Navbar
        style={{ position: 'sticky', top: 0, zIndex: 10, background: 'inherit' }}
      >
        <Button.NavLink
          to="/"
          $colors={{ text: '#609fc0' }}
          $fontSize={24}
          style={{ marginRight: 'auto' }}
        >
          <LogoIcon /> Cards
        </Button.NavLink>

        <Button.NavLink to="/example" $colors={{ text: 'white' }}>
          Example
        </Button.NavLink>
      </Toolbar.Navbar>

      <Suspense fallback={<LinearProgress color="#609fc0" />}>
        <Outlet />
      </Suspense>
    </>
  );
}
