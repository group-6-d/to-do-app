import { Link } from 'react-router-dom';
import HeaderStart from '../../components/HeaderStart/HeaderStart';

const StartPage = () => {
  return (
    <div className=' mx-auto flex h-screen max-w-[1520px] flex-col p-6'>
      <HeaderStart />
      <main className=' flex h-full flex-col items-center justify-center md:pb-52'>
        <div className=' relative  mb-8 flex overflow-hidden md:mb-14'>
          <h1
            className=' z-20 mb-4 text-center text-4xl font-bold
        
        md:w-[800px] md:text-8xl
        '
          >
            A simple to do list to manage it all
          </h1>

          <div
            className=' bg-accent md:-right-18 absolute -right-96 top-20 z-10 h-[1000px] w-[1000px]
          rounded-full md:top-40 md:h-[1400px] md:w-[1400px]
          '
          ></div>
        </div>
        <p
          className=' mb-12 text-center text-lg text-gray-500
        md:mb-24 md:w-[800px] md:text-4xl
        '
        >
          Effortlessly handle your personal tasks and family projects, all in a
          single location.
        </p>
        <Link to='/register'>
          <span
            className='bg-accent hover:bg-accentDark rounded-full border-none px-10 py-2 
          text-xl text-white transition duration-1000 ease-in-out
          md:px-16 md:py-4 md:text-2xl
          '
          >
            Get Started. It's FREE
          </span>
        </Link>
      </main>
    </div>
  );
};
export default StartPage;
