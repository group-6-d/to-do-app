import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../providers/UserProvider/UserProvider.hook';

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isLoggedIn } = useUser();

  const result = isLoggedIn ? element : <Navigate to='/login'/>;
  return result;
};

export default ProtectedRoute;
