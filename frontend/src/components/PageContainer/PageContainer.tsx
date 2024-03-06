import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const PageContainer = () => {
  return (
    <div className='h-screen w-screen'>
      <Header />
      <main className='h-[90%] overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};
export default PageContainer;
