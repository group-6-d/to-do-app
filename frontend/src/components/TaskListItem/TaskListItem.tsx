import { type dataType } from '../TaskList/TaskList';

const TaskListItem = ({ task }: { task: dataType }) => {
  const { id, title, category } = task;

  return (
    <li
      key={id}
      className='mb-2 flex min-h-[100px] flex-col justify-between bg-stone-50 p-2'
    >
      <h3>{title}</h3>

      <div className='flex justify-between'>
        <div className='rounded-xl border-2 border-gray-200 px-2 italic'>
          {category}
        </div>
        <button className=' bg-indigo-400 px-2 text-white'>Change</button>
      </div>
    </li>
  );
};
export default TaskListItem;
