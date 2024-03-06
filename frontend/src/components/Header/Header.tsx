import styles from './Header.module.css';

const Header = () => {
  return (
    <header className='flex w-full justify-between px-8 py-4'>
      <h2 className='p-5 uppercase hover:text-red-500'>
        TODO App [change to fancy name]
      </h2>
      <nav>
        <ul className='flex justify-between gap-4'>
          <li>My Tasks</li>
          <li>Profile Name</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
