// import {
//   MdOutlineLocalGroceryStore,
//   MdOutlinePerson,
//   MdOutlineSportsTennis,
//   MdOutlineLocalMovies,
//   MdWorkOutline,
// } from 'react-icons/md';
import SideBarItem from '../SideBarItem/SideBarItem';
import { LiaPlusSolid } from 'react-icons/lia';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';

const SideBar = () => {
  const { categoryListDate } = useTasksBoard();

  return (
    <aside className='h-fit rounded-br-3xl rounded-tr-3xl bg-white py-6 dark:bg-stone-800'>
      <button className='bg-accent hover:bg-accentDark mx-auto mb-4 flex items-center whitespace-nowrap rounded-full px-8 py-4 text-white'>
        <div className='flex items-center justify-between gap-2'>
          <LiaPlusSolid />
          New Task
        </div>
      </button>

      <ul className='mx-2 mb-3 rounded-lg border-[1px] border-stone-200 bg-white pb-1 dark:border-stone-700 dark:bg-stone-800'>
        <div className='p-2'>Priority:</div>
        <div className='flex'>
          <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
            <input
              type='checkbox'
              id='high'
              name='high'
              className='checked:bg-coral h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
            />
            <label
              htmlFor='high'
              className='m-0 text-sm  text-stone-900 hover:cursor-pointer dark:text-stone-100'
            >
              High
            </label>
          </li>
          <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
            <input
              type='checkbox'
              id='middle'
              name='middle'
              className='checked:bg-yellow h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
            />
            <label
              htmlFor='middle'
              className='m-0 text-sm text-stone-900 hover:cursor-pointer dark:text-stone-100'
            >
              Middle
            </label>
          </li>
          <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
            <input
              type='checkbox'
              id='low'
              name='low'
              className='checked:bg-purple h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
            />
            <label
              htmlFor='low'
              className='m-0 text-sm text-stone-900 hover:cursor-pointer dark:text-stone-100'
            >
              Low
            </label>
          </li>
        </div>
      </ul>

      <ul className=''>
        {categoryListDate &&
          categoryListDate.map((category) => (
            <SideBarItem category={category} />
          ))}
      </ul>
    </aside>
  );
};
export default SideBar;
