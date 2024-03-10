import { Outlet } from 'react-router-dom';

import { useTheme } from '../../hooks/useTheme';
import Header from '../Header/Header';

const PageContainer = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className='h-screen w-screen dark:bg-black dark:text-white'>
      <Header />
      <main className='h-[90%] overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};
export default PageContainer;
