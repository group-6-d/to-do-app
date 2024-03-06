import TaskList from '../TaskList/TaskList';

const MainSection = () => {
  return (
    <div className='flex h-full bg-slate-200'>
      {/* TODO: move side-menu to separate component */}
      <aside className=' bg-indigo-300'>
        <button className='mb-4 bg-indigo-700 px-8 py-4 text-white'>
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
      <div className='flex w-full justify-between gap-2 overflow-scroll p-2'>
        {/* TODO: move 'ul' to separate component */}
        <TaskList />
        <TaskList />
        <TaskList />
        <TaskList />
        <TaskList />
      </div>
    </div>
  );
};
export default MainSection;
