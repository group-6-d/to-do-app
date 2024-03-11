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
      <ul className=''>
        {categoryListDate &&
          categoryListDate.map((category) => <SideBarItem category={category} />)}
      </ul>
    </aside>
  );
};
export default SideBar;
