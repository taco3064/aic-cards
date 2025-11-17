import cx from 'clsx';

import Styled from './styled';
import type { CardMeta } from '~app/hooks/useCardsState';
import type { CardProps } from './types';

export default function Card<Meta extends CardMeta>({
  animationProps,
  backImg,
  className,
  classes,
  meta,
  size,
  onClick,
}: CardProps<Meta>) {
  return (
    <Styled.Container
      {...animationProps}
      $width={size.width}
      $height={size.height}
      data-id={meta.id}
      className={cx('card', classes?.root, className)}
      onClick={(e) => onClick?.(e, meta)}
    >
      <Styled.CardFront className={classes?.front} />
      <Styled.CardBack className={classes?.back} $backImg={backImg} />
    </Styled.Container>
  );
}
