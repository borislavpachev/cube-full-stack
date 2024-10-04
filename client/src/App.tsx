import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { ErrorPage, Favorites, Home, Login, SignUp } from './pages';
import { ROUTES } from './constants';
import { Footer, Header } from './components/layout';

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
