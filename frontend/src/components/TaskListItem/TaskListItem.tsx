import { FC } from 'react';
import TaskCard from '../../models/TaskCard';

interface TaskProps {
  task: TaskCard;
  onClick: (task: TaskCard) => void;
}

const TaskListItem: FC<TaskProps> = ({ task, onClick }) => {
  const { id, title, category } = task;

  return (
    <li
      key={id}
      onClick={() => onClick(task)}
      className='mx-2 mb-3 flex flex-col justify-between rounded-lg border-[1px] border-stone-200 bg-white px-4 py-2'
    >
      <div className='font-thin text-stone-400'>&#8250;&#32;{category}</div>
      <div className='flex items-center justify-between'>
        <h3 className='py-4 pr-4'>{title}</h3>

        <button className=' bg-accent hover:bg-accentDark h-8 rounded-2xl px-2 text-white'>
          Done
        </button>
      </div>
    </li>
  );
};
export default TaskListItem;
