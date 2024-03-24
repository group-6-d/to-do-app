// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// import {
//     MdOutlineLocalGroceryStore,
//     MdOutlinePerson,
//     MdOutlineSportsTennis,
//     MdOutlineLocalMovies,
//     MdWorkOutline,
//   } from 'react-icons/md';
import { FC, useContext } from 'react';
import Category from '../../models/Category';
import { SelectedCategoriesContext } from '../../context/SelectedCategoriesContext';
import { LuOption } from 'react-icons/lu';

interface SideBarItemProps {
  category: Category;
}

const SideBarItem: FC<SideBarItemProps> = ({ category }) => {
  const { selectedCategories, selectedCategoriesHandler } = useContext(
    SelectedCategoriesContext,
  );

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const categoryId = category.id;

    if (isChecked) {
      selectedCategoriesHandler([...selectedCategories, category]);
    } else {
      selectedCategoriesHandler(
        selectedCategories.filter((cat) => cat.id !== categoryId),
      );
    }
  };

  // console.log('selectedCategories', selectedCategories);

  return (
    <li className='' key={category.name}>
      <label className='items-middle flex cursor-pointer items-center justify-between p-2 px-5 hover:bg-stone-100 hover:dark:bg-stone-700'>
        {category.name}
        <input
          defaultChecked={true}
          onChange={handleCategory}
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
