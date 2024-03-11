import {
  MdOutlineLocalGroceryStore,
  MdOutlinePerson,
  MdOutlineSportsTennis,
  MdOutlineLocalMovies,
  MdWorkOutline,
} from 'react-icons/md';
import { LiaPlusSolid } from 'react-icons/lia';

const SideBar = () => {
  return (
    <aside className='h-fit rounded-br-3xl rounded-tr-3xl bg-white py-6 dark:bg-stone-800'>
      <button className='bg-accent hover:bg-accentDark mx-auto mb-4 flex items-center whitespace-nowrap rounded-full px-8 py-4 text-white'>
        <div className='flex items-center justify-between gap-2'>
          <LiaPlusSolid />
          New Task
        </div>
      </button>

      <ul className='mx-2 mb-3 rounded-lg border-[1px] border-stone-200 bg-white dark:border-stone-700'>
        <div className='py-2 pl-4'>Priority:</div>
        <div className='flex gap-2 px-3'>
          <li className='flex items-center justify-between gap-2 rounded-xl p-1 hover:bg-stone-100 hover:dark:bg-stone-700'>
            <span>High</span>
            <div className='bg-coral h-[1rem] w-[1rem] rounded-full' />
          </li>
          <li className='flex items-center justify-between gap-2 rounded-xl p-1 hover:bg-stone-100 hover:dark:bg-stone-700'>
            <span>Middle</span>
            <div className='bg-yellow h-[1rem] w-[1rem] rounded-full' />
          </li>
          <li className='flex items-center justify-between gap-2 rounded-xl p-1 hover:bg-stone-100 hover:dark:bg-stone-700'>
            <span>Low</span>
            <div className='bg-purple h-[1rem] w-[1rem] rounded-full' />
          </li>
        </div>
      </ul>

      <ul className=''>
        <li className='flex items-center justify-between gap-10 px-4 py-2   hover:bg-stone-100 hover:dark:bg-stone-700'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlinePerson className='icon' /> Personal
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500 dark:bg-stone-700'>
            5
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2   hover:bg-stone-100 hover:dark:bg-stone-700'>
          <div className='flex items-center justify-between gap-2'>
            <MdWorkOutline className='icon' /> Work
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500 dark:bg-stone-700'>
            0
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2   hover:bg-stone-100 hover:dark:bg-stone-700'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlineLocalGroceryStore className='icon' /> Shopping
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500 dark:bg-stone-700'>
            7
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2   hover:bg-stone-100 hover:dark:bg-stone-700'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlineSportsTennis className='icon' /> Hobbies
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500 dark:bg-stone-700'>
            3
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2   hover:bg-stone-100 hover:dark:bg-stone-700'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlineLocalMovies className='icon' /> Movies
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500 dark:bg-stone-700'>
            10
          </div>
        </li>
      </ul>
    </aside>
  );
};
export default SideBar;
