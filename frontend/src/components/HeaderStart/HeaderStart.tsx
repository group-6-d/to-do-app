import { Link, useNavigate, useLocation } from 'react-router-dom';
import useUser from '../../providers/UserProvider/UserProvider.hook';

const HeaderStart = () => {
  const { isLoggedIn } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const changeHeader = () => {
    if (location.pathname === '/') {
      return (
        <Link to='/login'>
          <span
            className=' text-accent border-accent hover:bg-accent rounded-full border px-10 py-2 
          text-xl transition duration-1000 ease-in-out hover:text-white
          md:px-16  md:text-2xl
          '
          >
            Login
          </span>
        </Link>
      );
    } else {
      return null;
    }
  };

  const handleLogoNavigate = () => {
    isLoggedIn ? navigate('/dashboard') : navigate('/');
  };

  return (
    <header className=' mb-6 flex h-[10%] w-full items-center justify-between'>
      <button
        onClick={handleLogoNavigate}
        className=' relative flex text-3xl font-medium md:text-5xl'
      >
        <p className='mr-4 md:mr-6'>T </p>
        <p>DO</p>
        <div
          className=' bg-accent absolute left-4 top-[13px] h-4 w-4 rounded-full
          md:left-6 md:top-[18px] md:h-6 md:w-6
          '
        ></div>
      </button>
      {changeHeader()}
    </header>
  );
};
export default HeaderStart;
