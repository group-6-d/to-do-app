// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useContext, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
import { SelectedCategoriesContext } from '../../context/SelectedCategoriesContext';
import { useCategoriesContext } from '../../context/CategoryContext';
import type TaskCard from '../../models/TaskCard';

const daysData = ['Today', 'Tomorrow', 'Day After Tomorrow'];

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

  useEffect(() => {
    const sortAndFilterTasks = () => {
      // const today = new Date().toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000)
        .toISOString()
        .split('T')[0];

      console.log('today', today);
      console.log('tomorrow', tomorrow);

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

  console.log('tasksToday', tasksToday);
  console.log('tasksTomorrow', tasksTomorrow);
  console.log('tasksUpcoming', tasksUpcoming);
  return (
    <div className='flex h-full'>
      <SideBar />

      <div className='flex w-full flex-col pl-4 pt-4 md:flex-row md:justify-start'>
        {daysData.map((day) => (
          <TaskList key={day} day={day} taskList={filteredTasksByCategory} />
        ))}
      </div>
    </div>
  );
};
export default MainPage;
