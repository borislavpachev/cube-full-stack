import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { ErrorPage, Home, Login } from './pages';
import { ROUTES } from './constants';
import { Header } from './components/layout';

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
