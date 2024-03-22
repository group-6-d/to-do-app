// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useContext, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
import { SelectedCategoriesContext } from '../../providers/SelectedCategoriesProvider';
import { useCategoriesContext } from '../../providers/CategoryProvider';

const daysData = ['Today', 'Tomorrow', 'Day After Tomorrow'];

const MainPage = () => {
  const { tasks } = useTasksBoard();
  const categories = useCategoriesContext();
  const { selectedCategories } = useContext(SelectedCategoriesContext);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (selectedCategories && categories) {
      const filterTasksByCategory = (tasks, categories) => {
        const categoriesMap = categories.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {});

        return tasks.filter((task) => {
          const categoryName = categoriesMap[task.category_id];
          if (categoryName) {
            task.categoryName = categoryName;
            return true;
          }
          return false;
        });
      };

      const filteredTasks = filterTasksByCategory(tasks, selectedCategories);
      setFilteredTasks(filteredTasks);
    }
  }, [tasks, categories, selectedCategories]);

  // console.log('selectedCategories in main', selectedCategories);
  // console.log('filteredTasks in main', filteredTasks);

  return (
    <div className='flex h-full '>
      <SideBar />

      <div className='flex w-full flex-col pl-4 pt-4 md:flex-row md:justify-start'>
        {daysData.map((day) => (
          <TaskList key={day} day={day} taskList={filteredTasks} />
        ))}
      </div>
    </div>
  );
};
export default MainPage;
