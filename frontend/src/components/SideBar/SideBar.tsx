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
      <ul className=''>
        <li className='flex items-center justify-between gap-10 gap-10  px-4 px-4 py-2   hover:bg-stone-100 hover:dark:bg-stone-700'>
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
