import { Routes, Route } from 'react-router-dom';

/* @Pages */
import { WelcomePage } from 'pages/welcome-page';
import { PreparePage } from 'pages/prepare-page';

/* @Components */
import { Layout } from 'components/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="prepare" element={<PreparePage />} />
      </Route>
    </Routes>
  );
}

export default App;
