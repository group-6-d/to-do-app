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
    <li className=''>
      <label className=' items-middle flex cursor-pointer items-center justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
        {category.name}
        <input
          onClick={handleCategory}
          type='checkbox'
          name='categoryCheckbox'
          value={category.name}
          className='checked:bg-accent h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
        />
      </label>
    </li>
  );
};
export default SideBarItem;
