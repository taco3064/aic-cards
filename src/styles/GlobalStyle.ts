import { createGlobalStyle } from 'styled-components';

export default {
  App: createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      font-family: Verdana, 微軟雅黑;
      background: #20252f;
    }

    #root {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100vw;
      height: 100dvh;
      overflow: hidden auto;
    }
  `,
};
