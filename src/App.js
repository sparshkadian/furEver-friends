import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import About from './pages/About';
import Protected from './components/Protected';
import Profile from './pages/Profile';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Pending from './pages/Pending';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <LandingPage />
              <About />
            </>
          }
        />
        <Route
          path='/home'
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path='/profile'
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route exact path='/login' element={<LogIn />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/auth/facebook' element={<Pending />} />
      </Routes>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </BrowserRouter>
  );
}

export default App;
