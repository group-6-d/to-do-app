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
    <aside className='rounded-tr-3xl bg-white pt-6'>
      <button className='bg-accent hover:bg-accentDark mx-auto mb-4 flex items-center whitespace-nowrap rounded-full px-8 py-4 text-white'>
        <div className='flex items-center justify-between gap-2'>
          <LiaPlusSolid />
          New Task
        </div>
      </button>
      <ul className=''>
        <li className='flex items-center justify-between gap-10 gap-10  px-4 px-4 py-2  hover:cursor-pointer hover:bg-stone-100'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlinePerson /> Personal
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500'>
            5
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2  hover:cursor-pointer hover:bg-stone-100'>
          <div className='flex items-center justify-between gap-2'>
            <MdWorkOutline /> Work
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500'>
            0
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2  hover:cursor-pointer hover:bg-stone-100'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlineLocalGroceryStore /> Shopping
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500'>
            7
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2  hover:cursor-pointer hover:bg-stone-100'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlineSportsTennis /> Hobbies
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500'>
            3
          </div>
        </li>
        <li className='flex  items-center justify-between  gap-10 px-4 py-2  hover:cursor-pointer hover:bg-stone-100'>
          <div className='flex items-center justify-between gap-2'>
            <MdOutlineLocalMovies /> Movies
          </div>

          <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500'>
            10
          </div>
        </li>
      </ul>
    </aside>
  );
};
export default SideBar;
