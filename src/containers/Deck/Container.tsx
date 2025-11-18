import cx from 'clsx';
import { useState } from 'react';

import Button from '~app/styles/Button';
import Card from '~app/components/Card';
import DrawCardIcon from '~app/components/icons/DrawCardIcon';
import ResetIcon from '~app/components/icons/ResetIcon';
import Styled from './styled';
import Toolbar from '~app/styles/Toolbar/Styled';
import { useCardsState, type CardMeta } from '~app/hooks/useCardsState';
import { useExtractClasses } from '~app/hooks/useExtractClasses';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { CardProps } from '~app/components/Card';
import type { DeckProps } from './types';

const CARD_CLASS_NAME = 'card';

const { Container, CardDeck, ShuffleButton, ActionButton, Status } = Styled;

export default function Deck<Meta extends CardMeta>({
  cardOptions: { backImg, size, total, generateMeta },
  className,
  classes,
  duration = 0.2,
}: DeckProps<Meta>) {
  const { deckRef, cards, onReset, ...stateFns } = useCardsState<Meta, HTMLDivElement>({
    selector: `:scope > .${CARD_CLASS_NAME}`,
    total,
    generateMeta,
  });

  const { shuffling, onShuffle } = useShuffleCards({
    ...stateFns,
    cards,
    duration,
    size,
  });

  const { spreading, onSpread } = useSpreadCards({
    ...stateFns,
    cards,
    duration,
  });

  const [spreaded, setSpreaded] = useState(false);
  const cardClasses = useExtractClasses<CardProps>(CARD_CLASS_NAME, classes);

  return (
    <Container className={cx('deck', classes?.root, className)}>
      <CardDeck
        ref={deckRef}
        className={classes?.deck}
        $cardClassName={CARD_CLASS_NAME}
        $width={size.width}
        $height={size.height}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ backImg, meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: total - i } }}
            classes={cardClasses}
          />
        ))}
      </CardDeck>

      <Toolbar.Base className={classes?.toolbar}>
        {shuffling ? (
          <Status className={classes?.status}>Shuffling...</Status>
        ) : spreading ? (
          <Status className={classes?.status}>Spreading...</Status>
        ) : (
          <Button.Group>
            {spreaded ? (
              <ActionButton
                onClick={() => {
                  onReset();
                  setSpreaded(false);
                }}
              >
                <ResetIcon />
              </ActionButton>
            ) : (
              <>
                <ShuffleButton onClick={() => onShuffle('overhand')}>
                  Overhand
                </ShuffleButton>

                <ActionButton
                  onClick={() => {
                    onSpread();
                    setSpreaded(true);
                  }}
                >
                  <DrawCardIcon />
                </ActionButton>

                <ShuffleButton onClick={() => onShuffle('riffle')}>Riffle</ShuffleButton>
              </>
            )}
          </Button.Group>
        )}
      </Toolbar.Base>
    </Container>
  );
}
