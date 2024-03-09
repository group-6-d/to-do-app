import { Link, NavLink } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';

import styles from './Header.module.css';

type NavLinkWithStyleProps = {
  isActive: boolean;
  label: string;
};

const NavLinkWithStyle = ({ isActive, label }: NavLinkWithStyleProps) => (
  <span className={isActive ? styles.active : ''}>{label}</span>
);

const Header = () => {
  return (
    <header className='flex h-[10%] w-full items-center justify-between px-8'>
      <Link to='/'>
        <h2 className=''>TODO App</h2>
      </Link>
      <div className='flex items-center'>
        <div className='cursor-pointer p-4 text-stone-400 hover:text-stone-700'>
          <MdOutlineDarkMode className='pt-1 text-3xl' />
        </div>
        <nav>
          <ul className='flex justify-between gap-4 rounded-full bg-white px-6 py-3 shadow-xl'>
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
