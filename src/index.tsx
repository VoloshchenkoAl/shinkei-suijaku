/* @Base Styes */
import './index.css';

/* @React Libs */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* @Providers */
import { BrowserRouter } from 'react-router-dom';
import { GameProvider } from 'game-provider';

/* @Components */
import { App } from 'components/app';

const container = document.getElementById('root') as HTMLElement;
const app = createRoot(container);

function Root() {
  return (
    <StrictMode>
      <BrowserRouter>
        <GameProvider>
          <App />
        </GameProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

app.render(<Root />);
