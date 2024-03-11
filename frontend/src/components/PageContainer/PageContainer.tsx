import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const PageContainer = () => {
  return (
    <div className='h-screen w-screen dark:bg-stone-950 dark:text-stone-50'>
      <Header />
      <main className='h-[90%] overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};
export default PageContainer;
