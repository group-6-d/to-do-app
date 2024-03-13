// import {
//     MdOutlineLocalGroceryStore,
//     MdOutlinePerson,
//     MdOutlineSportsTennis,
//     MdOutlineLocalMovies,
//     MdWorkOutline,
//   } from 'react-icons/md';
import { FC } from 'react';
import Category from '../../models/Category';

interface SideBarItemProps {
  category: Category;
  handleCategory: (e: any) => void;
}

const SideBarItem: FC<SideBarItemProps> = ({ category, handleCategory }) => {

  return (
    <button
    onClick={handleCategory}
    value={category.name}
    className='flex items-center justify-between gap-10 gap-10  px-4 px-4 py-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
      <div className='flex items-center justify-between gap-2'>
        {/* <MdOutlinePerson className='icon' />  */}
        {category.name}
      </div>
      <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500 dark:bg-stone-700'>
        5
      </div>
    </button>
  );
};
export default SideBarItem;
