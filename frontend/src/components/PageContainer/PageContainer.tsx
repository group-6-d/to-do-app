import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const PageContainer = () => {
  return (
    <div className='flex min-h-screen w-screen flex-col'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default PageContainer;
