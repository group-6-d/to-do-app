import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center text-xl'>
      <h2 className='text-8xl'>404</h2>
      <p>Error occur</p>
      <Link to='/' className='underline'>
        Go to main page
      </Link>
    </div>
  );
};
export default ErrorPage;
