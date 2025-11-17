import cx from 'clsx';

import Styled from './styled';
import { useCardsState } from '~app/hooks/useCardsState';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { DeckProps } from './types';

export default function Deck({
  cardOptions: { backImg, size, total, generateMeta },
  className,
  classes,
  duration = 0.2,
}: DeckProps) {
  const { cards, scopeRef, shuffling, ...shuffleFns } = useCardsState<
    HTMLDivElement,
    HTMLDivElement
  >({
    selector: ':scope > .card',
    total,
    generateMeta,
  });

  const { onShuffle } = useShuffleCards<HTMLDivElement>({
    ...shuffleFns,
    cards,
    duration,
    size,
  });

  return (
    <Styled.Container className={cx('deck', classes?.root, className)}>
      <Styled.Deck
        ref={scopeRef}
        className={classes?.deck}
        $width={size.width}
        $height={size.height}
      >
        {cards.map((meta, i) => (
          <Styled.Card
            {...{ backImg, meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: -i } }}
            className={classes?.card}
          />
        ))}
      </Styled.Deck>

      <Styled.Toolbar className={classes?.toolbar}>
        {shuffling ? (
          <Styled.Status className={classes?.status}>Shuffling...</Styled.Status>
        ) : (
          <>
            <Styled.Button
              className={classes?.button}
              onClick={() => onShuffle('overhand')}
            >
              Overhand
            </Styled.Button>

            <Styled.Button
              className={classes?.button}
              onClick={() => onShuffle('riffle')}
            >
              Riffle
            </Styled.Button>
          </>
        )}
      </Styled.Toolbar>
    </Styled.Container>
  );
}
