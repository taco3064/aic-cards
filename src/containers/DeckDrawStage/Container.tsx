import cx from 'clsx';

import Card from '~app/components/Card';
import Cards from '~app/styles/Cards';
import DeckToolbar from './DeckToolbar';
import Styled from './styleds';
import { useCardsState, type CardMeta } from '~app/hooks/useCardsState';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { DeckDrawStageProps, ToolbarStatus } from './types';

export default function DeckDrawStage<Meta extends CardMeta>({
  backImg,
  className,
  defaultCards,
  size,
  onCardClick,
  onCardContentRender,
  onCardImageRender,
}: DeckDrawStageProps<Meta>) {
  const { deckRef, cards, animate, getCardElements, onCardsChange, onCardsReset } =
    useCardsState<Meta, HTMLDivElement>(defaultCards);

  const { shuffling, onShuffle } = useShuffleCards({
    cards,
    size,
    animate,
    getCardElements,
    onCardsChange,
  });

  const { spreaded, spreading, onSpread, onSpreadReset } = useSpreadCards({
    size,
    animate,
    getCardElements,
  });

  return (
    <Styled.Container className={cx('DeckStageContainer', className)}>
      <Cards.Deck
        ref={deckRef}
        className="DeckStageDeck"
        $width={size.width}
        $height={size.height}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: cards.length - i } }}
            className="DeckStageCard"
            imgs={{ back: backImg, front: onCardImageRender?.(meta) }}
            onClick={onCardClick}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Cards.Deck>

      <DeckToolbar
        {...{ onShuffle, onSpread }}
        className="DeckStageToolbar"
        status={cx({ shuffling, spreading, spreaded }) as ToolbarStatus}
        onReset={() => {
          onCardsReset();
          onSpreadReset();
        }}
      />
    </Styled.Container>
  );
}
