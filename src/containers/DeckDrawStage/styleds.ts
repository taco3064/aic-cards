import styled from 'styled-components';
import Button from '~app/styles/Button';

export default {
  Container: styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: calc(100% - 48px);
    height: 100%;
    padding: 12px 24px;
    gap: 24px;
    overflow: hidden;
  `,
  ShuffleButton: styled(Button.Base)`
    font-size: 14px;
    width: 120px;
  `,
  ActionButton: styled(Button.Base)<{ $disableMargin?: boolean }>`
    width: 60px;
    height: 60px;
    font-size: 36px;
    border-radius: 50% !important;
    margin: ${({ $disableMargin }) => ($disableMargin ? '0' : '-10px')};
    z-index: 1;
  `,
};
