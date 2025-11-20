import styled from 'styled-components';

export default {
  Deck: styled.div<CardSize<'styled'> & { $selector?: string }>`
    position: relative;
    top: -10%;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotate3d(1, 0.2, -0.5, 45deg);
    transform-origin: center;

    &:has(+ .spreaded) {
      transform: rotate3d(0, 0, 0, 0deg);
    }

    ${({ $width, $height, $selector = '> *' }) => `
      & ${$selector} {
        position: absolute;
        top: calc(50% - ${$height / 2}px);
        left: calc(50% - ${$width / 2}px);
      }
    `}
  `,
};
