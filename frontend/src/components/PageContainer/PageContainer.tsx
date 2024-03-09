import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const PageContainer = () => {
  return (
    <div className='h-screen w-screen bg-stone-100'>
      <Header />
      <main className='h-[90%] overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};
export default PageContainer;
