/* @Base Styes */
import './index.css';

/* @React Libs */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

/* @Components */
import { App } from 'components/app';

const container = document.getElementById('root') as HTMLElement;
const app = createRoot(container);

function Root() {
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

app.render(<Root />);
