import { useAuthStatus } from '../hooks/useAuthStatus';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const Protected = ({ children }) => {
  const { isLoggedIn, CheckingStatus } = useAuthStatus();

  if (CheckingStatus) {
    return <Spinner />;
  } else return isLoggedIn ? children : <Navigate to='/login' />;
};

export default Protected;
