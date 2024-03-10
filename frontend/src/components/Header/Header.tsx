import { Link, NavLink } from 'react-router-dom';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';

type NavLinkWithStyleProps = {
  isActive: boolean;
  label: string;
};

const NavLinkWithStyle = ({ isActive, label }: NavLinkWithStyleProps) => (
  <span className={isActive ? 'active' : ''}>{label}</span>
);

const Header = () => {
  const { isDarkMode, darkModeHandler } = useTheme();

  const handleMode = () => {
    darkModeHandler();
  };

  return (
    <header className='flex h-[10%] w-full items-center justify-between px-8'>
      <Link to='/'>
        <h2 className=''>TODO App</h2>
      </Link>
      <div className='flex items-center'>
        <div className='cursor-pointer p-4 text-stone-400 hover:text-stone-700'>
          <button className='pt-3 text-2xl' onClick={() => handleMode()}>
            {isDarkMode && <MdOutlineLightMode />}
            {!isDarkMode && <MdOutlineDarkMode />}
          </button>
        </div>
        <nav>
          <ul className='flex justify-between gap-4 rounded-full bg-white px-6 py-3 shadow-xl dark:bg-stone-800'>
            <li>
              <NavLink to='/' end>
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
