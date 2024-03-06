import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='flex h-[10%] w-full items-center justify-between px-8'>
      <h2 className=''>TODO App</h2>
      <nav>
        <ul className='flex justify-between gap-4'>
          <li>
            <Link to='/'>Dashboard</Link>
          </li>
          <li>
            <Link to='profile'>Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
