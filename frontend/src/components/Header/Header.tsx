import { Link, NavLink } from 'react-router-dom';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';
import useUser from '../../providers/UserProvider/UserProvider.hook';

type NavLinkWithStyleProps = {
  isActive: boolean;
  label: string;
};

const NavLinkWithStyle = ({ isActive, label }: NavLinkWithStyleProps) => (
  <span className={isActive ? 'nav-item--active' : ''}>{label}</span>
);

const Header = () => {
  const { isDarkMode, darkModeHandler } = useTheme();
  const { isLoggedIn } = useUser();

  const handleMode = () => {
    darkModeHandler();
  };

  return (
    <header className='flex h-[10%] w-full items-center justify-between px-8'>
      <Link to={isLoggedIn ? '/' : '/login'}>
        <div className='relative flex text-3xl font-medium md:text-5xl'>
          <p className='mr-4 md:mr-6'>T </p>
          <p>DO</p>
          <div
            className=' bg-accent absolute left-4 top-[13px] h-4 w-4 rounded-full
          md:left-6 md:top-[18px] md:h-6 md:w-6
          '
          ></div>
        </div>
      </Link>

      <div className='flex items-center'>
        <div className='cursor-pointer p-4 text-stone-400 hover:text-stone-700'>
          <div className='pt-3 text-2xl' onClick={() => handleMode()}>
            {isDarkMode && <MdOutlineLightMode />}
            {!isDarkMode && <MdOutlineDarkMode />}
          </div>
        </div>
        <nav>
          <ul className='flex justify-between gap-4 rounded-full bg-white px-6 py-3 text-gray-500 shadow-xl dark:bg-stone-800'>
            <li>
              <NavLink to='/dashboard' end>
                {({ isActive }) => (
                  <NavLinkWithStyle isActive={isActive} label='Dashboard' />
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to='/profile'>
                {({ isActive }) => (
                  <NavLinkWithStyle isActive={isActive} label='Profile' />
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
