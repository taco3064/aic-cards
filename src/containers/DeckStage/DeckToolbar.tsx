import cx from 'clsx';

import Button from '~app/styles/Button';
import DrawCardIcon from '~app/components/icons/DrawCardIcon';
import ResetIcon from '~app/components/icons/ResetIcon';
import Styled from './styled';
import Toolbar from '~app/styles/Toolbar/Styled';
import Typography from '~app/styles/Typography';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { CardMeta } from '~app/hooks/useCardsState';
import type { DeckToolbarProps } from './types';

const { ShuffleButton, ActionButton } = Styled;

export default function DeckToolbar<Meta extends CardMeta>({
  className,
  onCardsReset,
  ...props
}: DeckToolbarProps<Meta>) {
  const { shuffling, onShuffle } = useShuffleCards(props);
  const { spreaded, spreading, onSpread, onSpreadReset } = useSpreadCards(props);

  return (
    <Toolbar.Base className={cx('DeckToolbar', className, { spreaded })}>
      {shuffling || spreading ? (
        <Typography.Status>
          {shuffling ? 'Shuffling...' : 'Spreading...'}
        </Typography.Status>
      ) : (
        <Button.Group>
          {spreaded ? (
            <ActionButton
              onClick={() => {
                onCardsReset();
                onSpreadReset();
              }}
            >
              <ResetIcon />
            </ActionButton>
          ) : (
            <>
              <ShuffleButton onClick={() => onShuffle('OVERHAND')}>
                Overhand
              </ShuffleButton>

              <ActionButton onClick={() => onSpread('ARCHED_RIBBON')}>
                <DrawCardIcon />
              </ActionButton>

              <ShuffleButton onClick={() => onShuffle('RIFFLE')}>Riffle</ShuffleButton>
            </>
          )}
        </Button.Group>
      )}
    </Toolbar.Base>
  );
}
