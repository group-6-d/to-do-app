import { useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
import { useDates } from '../../hooks/useDates';

const MainPage = () => {
  const { getTasksList, taskListDate, getCategoryList, categoryListDate } =
    useTasksBoard();
  const { formattedDateToday, formattedDateTomorrow } = useDates();

  useEffect(() => {
    getTasksList();
    getCategoryList();
  }, [taskListDate, categoryListDate]);

  return (
    <div className='flex h-full '>
      <SideBar />

      <div className='flex max-w-[1500px] flex-col gap-x-4 p-4 md:flex-row md:justify-around lg:gap-x-6 xl:gap-x-10'>
        <TaskList
          day='Today'
          date={formattedDateToday}
          taskListDate={taskListDate}
        />
        <TaskList
          day='Tomorrow'
          date={formattedDateTomorrow}
          taskListDate={taskListDate}
        />
        <TaskList day='Upcoming' taskListDate={taskListDate} />
      </div>
    </div>
  );
};
export default MainPage;
