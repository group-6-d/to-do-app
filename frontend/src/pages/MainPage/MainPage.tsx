import TaskList from '../../components/TaskList/TaskList';

const MainPage = () => {
  return (
    <div className='flex h-full bg-stone-100'>
      {/* TODO: move side-menu to separate component */}
      <aside className='bg-white'>
        <button className='bg-accent hover:bg-accentDark mb-4 whitespace-nowrap px-8 py-4 text-white'>
          New Task
        </button>
        <ul className='pl-5'>
          <li className='py-2 hover:cursor-pointer hover:underline'>
            Personal
          </li>
          <li className='py-2 hover:cursor-pointer hover:underline'>Work</li>
          <li className='py-2 hover:cursor-pointer hover:underline'>
            Shopping
          </li>
          <li className='py-2 hover:cursor-pointer hover:underline'>Hobbies</li>
          <li className='py-2 hover:cursor-pointer hover:underline'>Movies</li>
        </ul>
      </aside>

      {/* TODO: move task-board to separate component */}
      <div className='flex w-full flex-col justify-around gap-6 p-4 md:flex-row'>
        {/* TODO: move 'ul' to separate component */}
        <TaskList />
        <TaskList />
        <TaskList />
      </div>
    </div>
  );
};
export default MainPage;
