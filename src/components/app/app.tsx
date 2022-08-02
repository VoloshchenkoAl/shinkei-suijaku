import { Routes, Route } from 'react-router-dom';

/* @Pages */
import { WelcomePage } from 'pages/welcome-page';
import { PreparePage } from 'pages/prepare-page';

/* @Components */
import { Layout } from 'components/layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/prepare" element={<PreparePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
