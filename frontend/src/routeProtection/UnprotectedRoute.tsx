import { useEffect, ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../providers/UserProvider/UserProvider.hook';

interface UnprotectedRouteProps {
  element: ReactNode;
}

const UnprotectedRoute: FC<UnprotectedRouteProps> = ({ element }) => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard');
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? null : element;
};

export default UnprotectedRoute;
