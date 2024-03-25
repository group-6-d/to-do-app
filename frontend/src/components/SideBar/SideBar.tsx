// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { FC, useState } from 'react';
import SideBarItem from '../SideBarItem/SideBarItem';
import { LiaPlusSolid } from 'react-icons/lia';
import TaskPopupEdit from '../TaskPopupEdit';
import TaskPopupRead from '../TaskPopupRead';
// import { useCategoriesContext } from '../../context/CategoryContext';
import useCategories from '../../hooks/useCategories';
import useUser from '../../providers/UserProvider/UserProvider.hook';

const SideBar: FC = () => {
  // const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);

  const [newTask, setNewTask] = useState<TaskCard | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(null);
  // const categories = useCategoriesContext();

  const token = localStorage.getItem('token');
  const { categories } = useCategories(token);

  const { currentUser } = useUser();

  const openTaskPopup = () => {
    const newTask: TaskCard = {
      id: null,
      user_id: currentUser.id,
      title: '',
      status: 'to do',
      category_id: 6,
      categoryName: 'other',
      priority: 'medium',
    };
    setIsEditMode(true);
    setNewTask(newTask);
    setIsTaskPopupOpen(true);
  };

  const closeTaskPopup = () => {
    setNewTask(null);
    setIsTaskPopupOpen(false);
  };

  // const arrСategories = Object.values(categories).flat();

  return (
    <aside className='h-fit min-w-[180px] rounded-br-3xl rounded-tr-3xl bg-white py-6 dark:bg-stone-800'>
      <button className='bg-accent hover:bg-accentDark mx-auto mb-4 flex items-center whitespace-nowrap rounded-full px-8 py-4 text-white'>
        <div
          onClick={() => openTaskPopup()}
          className='flex items-center justify-between gap-2'
        >
          <LiaPlusSolid />
          New Task
        </div>
      </button>
      {/* <ul className=''>
        {arrСategories &&
          arrСategories.map((category, index) => (
            <SideBarItem key={index} category={category} />
          ))}
      </ul> */}

      <ul className=''>
        {categories &&
          categories.map((category, index) => (
            <SideBarItem key={index} category={category} />
          ))}
      </ul>

      <div>
        {isEditMode && newTask && (
          <TaskPopupEdit
            categories={categories || []}
            task={newTask}
            closeTaskPopup={closeTaskPopup}
            setIsEditMode={setIsEditMode}
            setCurrentTask={setNewTask}
          />
        )}
        {!isEditMode && newTask && (
          <TaskPopupRead task={newTask} closeTaskPopup={closeTaskPopup} />
        )}
      </div>
    </aside>
  );
};
export default SideBar;
