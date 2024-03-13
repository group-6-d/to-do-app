import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
import TaskCard from '../../models/TaskCard';

const daysData = ['Today', 'Tomorrow', 'Day After Tomorrow'];

const MainPage = () => {
  const { getTasksList, taskListDate, getCategoryList, categoryListDate } =
    useTasksBoard();

  const[initialTaskList, setInitialTaskList] = useState<TaskCard[]>([])
  const [filteredTaskList, setFilteredTaskList] = useState<TaskCard[]>([]);

  useEffect(() => {
    setInitialTaskList(taskListDate);
    setFilteredTaskList(taskListDate);
  }, [taskListDate]);

  useEffect(() => {
    getTasksList();
    getCategoryList();
  }, [initialTaskList, categoryListDate]);

  const handleCategory = (e: any) => {
    console.log(e.target.value); 
      setFilteredTaskList(
        initialTaskList.filter((task) => task.category === e.target.value),
      );
  };

  return (
    <div className='flex h-full '>
      <SideBar handleCategory={handleCategory} />

      <div className='flex w-full flex-col gap-x-6 p-4 md:flex-row md:justify-around'>
        {daysData.map((day) => (
          <TaskList day={day} taskList={filteredTaskList} />
        ))}
      </div>
    </div>
  );
};
export default MainPage;
