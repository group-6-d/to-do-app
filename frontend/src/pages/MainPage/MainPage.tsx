import SideBar from '../../components/SideBar/SideBar';
import TaskList from '../../components/TaskList/TaskList';
import TaskPopupRead from '../../components/TaskPopupRead';

const daysData = ['Today', 'Tomorrow', 'Day After Tomorrow'];

const MainPage = () => {
  return (
    <div className='flex h-full bg-stone-100'>
      <SideBar />

      <div className='flex w-full flex-col justify-around gap-6 p-4 md:flex-row'>
        {daysData.map((day) => (
          <TaskList day={day} />
        ))}
      </div>
      <TaskPopupRead />
    </div>
  );
};
export default MainPage;
