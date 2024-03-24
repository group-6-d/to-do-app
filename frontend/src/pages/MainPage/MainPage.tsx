// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useContext, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
import { SelectedCategoriesContext } from '../../context/SelectedCategoriesContext';
import { useCategoriesContext } from '../../context/CategoryContext';
import { getFormattedDate } from '../../utils/utils';
import type TaskCard from '../../models/TaskCard';

const MainPage = () => {
  const { tasks } = useTasksBoard();
  const categories = useCategoriesContext();
  const { selectedCategories } = useContext(SelectedCategoriesContext);
  const [filteredTasksByCategory, setFilteredTasksByCategory] = useState([]);
  const [tasksToday, setTasksToday] = useState<TaskCard[]>([]);
  const [tasksTomorrow, setTasksTomorrow] = useState<TaskCard[]>([]);
  const [tasksUpcoming, setTasksUpcoming] = useState<TaskCard[]>([]);

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

      const filteredTasksByCategory = filterTasksByCategory(
        tasks,
        selectedCategories,
      );
      setFilteredTasksByCategory(filteredTasksByCategory);
    }
  }, [tasks, categories, selectedCategories]);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  useEffect(() => {
    const sortAndFilterTasks = () => {
      const tasksToday = filteredTasksByCategory.filter(
        (task) => task.due_date === today,
      );
      const tasksTomorrow = filteredTasksByCategory.filter(
        (task) => task.due_date === tomorrow,
      );
      const tasksUpcoming = filteredTasksByCategory.filter(
        (task) => task.due_date !== today && task.due_date !== tomorrow,
      );

      setTasksToday(tasksToday);
      setTasksTomorrow(tasksTomorrow);
      setTasksUpcoming(tasksUpcoming);
    };

    sortAndFilterTasks();
  }, [filteredTasksByCategory]);

  return (
    <div className='flex h-full'>
      <SideBar />

      <div className='flex w-full flex-col pl-4 pt-4 md:flex-row md:justify-start'>
        <TaskList day='Today' date={today} taskList={tasksToday} />
        <TaskList day='Tomorrow' date={tomorrow} taskList={tasksTomorrow} />
        <TaskList day='Upcoming' taskList={tasksUpcoming} />
      </div>
    </div>
  );
};
export default MainPage;
