import { Link, NavLink } from 'react-router-dom';
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
      <h2 className=''>
        <Link to='/'>TODO App</Link>
      </h2>
      <nav>
        <ul className='flex justify-between gap-4'>
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
    </header>
  );
};

export default Header;
