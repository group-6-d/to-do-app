// import {
//     MdOutlineLocalGroceryStore,
//     MdOutlinePerson,
//     MdOutlineSportsTennis,
//     MdOutlineLocalMovies,
//     MdWorkOutline,
//   } from 'react-icons/md';
import { FC, useContext } from 'react';
import Category from '../../models/Category';
import { SelectedCategoriesContext } from '../../providers/SelectedCategoriesProvider';

interface SideBarItemProps {
  category: Category;
}

const SideBarItem: FC<SideBarItemProps> = ({ category }) => {
  const { filters, filterTasksHandler } = useContext(SelectedCategoriesContext);

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryName = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      filterTasksHandler([...(filters ?? []), categoryName]);
    } else {
      filterTasksHandler((filters ?? []).filter((cat) => cat !== categoryName));
    }
  };

  return (
    <li className='' key={category.name}>
      <label className='items-middle flex cursor-pointer items-center justify-between p-2 px-5 hover:bg-stone-100 hover:dark:bg-stone-700'>
        {category.name}
        <input
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
