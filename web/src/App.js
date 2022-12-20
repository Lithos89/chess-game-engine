import Session from './components/Session';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-align: center;
  };
`;

function App() {
  return (
    <div className="App">
      <div id="main">
        <GlobalStyle />
        <Session />
      </div>
    </div>
  );
}

export default App;
