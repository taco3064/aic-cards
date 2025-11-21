import styled from 'styled-components';

export default {
  Base: styled.svg<{ $scale?: number }>`
    width: 1em;
    height: 1em;
    fill: currentColor;
    transform: scale(${({ $scale = 1 }) => $scale});
  `,
};
