// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// import {
//   MdOutlineLocalGroceryStore,
//   MdOutlinePerson,
//   MdOutlineSportsTennis,
//   MdOutlineLocalMovies,
//   MdWorkOutline,
// } from 'react-icons/md';
import { FC, useEffect, useState } from 'react';
import SideBarItem from '../SideBarItem/SideBarItem';
import { LiaPlusSolid } from 'react-icons/lia';
import TaskPopupNew from '../TaskPopupNew';
import { useCategoriesContext } from '../../context/CategoryContext';
import Category from '../../models/Category';
import SideBarPriorityFilterItem from '../SideBarPriorityItem/SideBarPriorityItem';

const priorityItem = [
  { name: 'High', color: 'coral' },
  { name: 'Medium', color: 'yellow' },
  { name: 'low', color: 'purple' },
];

const SideBar: FC = () => {
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const categories = useCategoriesContext();

  const arrСategories = Object.values(categories).flat();

  const openTaskPopup = () => {
    setIsTaskPopupOpen(true);
  };

  const closeTaskPopup = () => {
    setIsTaskPopupOpen(false);
  };

  return (
    <aside className='h-fit min-w-fit rounded-br-3xl rounded-tr-3xl bg-white py-6 dark:bg-stone-800'>
      <button className='bg-accent hover:bg-accentDark mx-auto mb-4 flex items-center whitespace-nowrap rounded-full px-8 py-4 text-white'>
        <div
          onClick={() => openTaskPopup()}
          className='flex items-center justify-between gap-2'
        >
          <LiaPlusSolid />
          New Task
        </div>
      </button>

      <ul className='mx-2 mb-3 rounded-lg border-[1px] border-stone-200 bg-white pb-1 dark:border-stone-700 dark:bg-stone-800'>
        <div className='p-2'>Priority:</div>
        <div className='flex'>
          {priorityItem.map((item, index) => (
            <SideBarPriorityFilterItem
              key={index}
              name={item.name}
              color={item.color}
            />
          ))}
        </div>
      </ul>

      <ul className=''>
        {arrСategories &&
          arrСategories.map((category, index) => (
            <SideBarItem key={index} category={category} />
          ))}
      </ul>
      {isTaskPopupOpen && (
        <TaskPopupNew
          categories={arrСategories || []}
          closeTaskPopup={closeTaskPopup}
          onAddTask={() => {}}
        />
      )}
    </aside>
  );
};
export default SideBar;
