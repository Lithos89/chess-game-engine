

// Styling
import { createGlobalStyle } from 'styled-components';
import Theme from "./config/theme";

// Components
import Session from './components/Session';

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
        <Theme>
          <GlobalStyle />
          <Session />
        </Theme>
      </div>
    </div>
  );
}

export default App;
