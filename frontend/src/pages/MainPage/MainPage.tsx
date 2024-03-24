// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useContext, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
import { SelectedCategoriesContext } from '../../context/SelectedCategoriesContext';
import { useCategoriesContext } from '../../context/CategoryContext';
import { SelectedPriorityContext } from '../../context/PriorityContext';
// import { getFormattedDate } from '../../utils/utils';
import type TaskCard from '../../models/TaskCard';

const MainPage = () => {
  const { tasks } = useTasksBoard();
  const categories = useCategoriesContext();
  const { selectedCategories } = useContext(SelectedCategoriesContext);
  const [filteredTasksByCategory, setFilteredTasksByCategory] = useState([]);
  const { selectedPriority } = useContext(SelectedPriorityContext);
  const [filteredTasksByPriority, setFilteredTasksByPriority] = useState([]);

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
    if (selectedPriority && tasks) {
      const filterTasksByPriority = (tasks, priority) => {
        return tasks.filter((task) => priority.includes(task.priority));
      };

      const filteredTasksByPriority = filterTasksByPriority(
        filteredTasksByCategory,
        selectedPriority,
      );
      setFilteredTasksByPriority(filteredTasksByPriority);
    }
  }, [selectedPriority, filteredTasksByCategory]);

  // filter by days
  useEffect(() => {
    const sortAndFilterTasks = () => {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000)
        .toISOString()
        .split('T')[0];

      const tasksToday = filteredTasksByPriority.filter(
        (task) => task.due_date === today,
      );
      const tasksTomorrow = filteredTasksByPriority.filter(
        (task) => task.due_date === tomorrow,
      );
      const tasksUpcoming = filteredTasksByPriority.filter(
        (task) => task.due_date !== today && task.due_date !== tomorrow,
      );

      setTasksToday(tasksToday);
      setTasksTomorrow(tasksTomorrow);
      setTasksUpcoming(tasksUpcoming);
    };

    sortAndFilterTasks();
  }, [filteredTasksByCategory, filteredTasksByPriority]);

  console.log('selectedCategories', selectedCategories);
  console.log('selectedPriority', selectedPriority);
  console.log('filtered Tasks By Category', filteredTasksByCategory);
  console.log('filtered Tasks By Priority', filteredTasksByPriority);

  return (
    <div className='flex h-full'>
      <SideBar />

      <div className='flex w-full flex-col pl-4 pt-4 md:flex-row md:justify-start'>
        <TaskList day={'Today'} taskList={tasksToday} />
        <TaskList day={'Tomorrow'} taskList={tasksTomorrow} />
        <TaskList day={'Upcoming'} taskList={tasksUpcoming} />
      </div>
    </div>
  );
};
export default MainPage;
