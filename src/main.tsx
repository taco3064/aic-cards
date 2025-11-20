import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CARD_BACK_IMG from '~app/assets/imgs/poker-pattern.png';
import DeckDrawStage from '~app/containers/DeckDrawStage';
import GlobalStyle from '~app/styles/GlobalStyle';

const POKER = Array.from({ length: 52 }).map((_, i) => ({ id: i }));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle.App />

    <DeckDrawStage
      backImg={CARD_BACK_IMG}
      defaultCards={POKER}
      size={{ width: 180, height: 260 }}
      onCardClick={console.log}
    />
  </StrictMode>,
);
