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
    category: Category,
}
  
  const SideBarItem: FC<SideBarItemProps> = ({ category }) => {
    return (
          <li className='flex items-center justify-between gap-10 gap-10  px-4 px-4 py-2   hover:bg-stone-100 hover:dark:bg-stone-700'>
            <div className='flex items-center justify-between gap-2'>
              {/* <MdOutlinePerson className='icon' />  */}
              {category.name}
            </div> 
            <div className='rounded-full bg-stone-200  px-2    text-sm text-stone-500 dark:bg-stone-700'>
              5
            </div>
          </li>
     
    );
  };
  export default SideBarItem;
  