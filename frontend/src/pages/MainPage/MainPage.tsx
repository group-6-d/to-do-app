// TODO: For our safety we need to remove @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';

const daysData = ['Today', 'Tomorrow', 'Day After Tomorrow'];

const MainPage = () => {
  const { tasks } = useTasksBoard();

  return (
    <div className='flex h-full '>
      <SideBar />

      <div className='flex w-full flex-col pl-4 pt-4 md:flex-row md:justify-start'>
        {daysData.map((day) => (
          <TaskList key={day} day={day} taskList={tasks} />
        ))}
      </div>
    </div>
  );
};
export default MainPage;
