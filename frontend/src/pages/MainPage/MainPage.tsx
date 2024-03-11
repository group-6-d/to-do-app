import { useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';

const daysData = ['Today', 'Tomorrow', 'Day After Tomorrow'];

const MainPage = () => {
  const { getTasksList, taskListDate, getCategoryList, categoryListDate } =
    useTasksBoard();

  useEffect(() => {
    getTasksList();
    getCategoryList();
  }, [taskListDate, categoryListDate]);

  return (
    <div className='flex h-full '>
      <SideBar />

      <div className='flex max-w-[1500px] flex-col gap-x-4 p-4 md:flex-row md:justify-around lg:gap-x-6 xl:gap-x-10'>
        {daysData.map((day) => (
          <TaskList day={day} taskListDate={taskListDate} />
        ))}
      </div>
    </div>
  );
};
export default MainPage;
