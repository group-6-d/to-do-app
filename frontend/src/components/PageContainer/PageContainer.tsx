import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const PageContainer = () => {
  return (
    <div className='h-screen w-screen'>
      <Header />
      <main className='h-full overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};
export default PageContainer;
