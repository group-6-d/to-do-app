const Header = () => {
  return (
    <header className='flex w-full justify-between px-8 py-4'>
      <h2 className=''>TODO App</h2>
      <nav>
        <ul className='flex justify-between gap-4'>
          <li>Dashboard</li>
          <li>Profile</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
