import { type dataType } from '../TaskList/TaskList';

const TaskListItem = ({ task }: { task: dataType }) => {
  const { id, title, category } = task;

  return (
    <li key={id} className='mb-2 flex  flex-col justify-between bg-white p-2'>
      <h3>{title}</h3>

      <div className='flex justify-between'>
        <div className='rounded-xl border-2 border-gray-200 px-2 italic'>
          {category}
        </div>
        <button className=' bg-accent px-2 text-white'>Change</button>
      </div>
    </li>
  );
};
export default TaskListItem;
