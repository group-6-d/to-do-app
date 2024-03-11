import { FC } from 'react';
import TaskCard from '../../models/TaskCard';
import { getPriorityColor } from '../../utils/utils';
import { MdOutlineDone, MdDoneAll } from 'react-icons/md';

interface TaskProps {
  task: TaskCard;
  onClick: (task: TaskCard) => void;
}

const TaskListItem: FC<TaskProps> = ({ task, onClick }) => {
  const { id, title, category, priority, isDone } = task;

  const priorityColor = getPriorityColor(priority);
  const priorityBgColor = `bg-${priorityColor}`;

  return (
    <li
      key={id}
      onClick={() => onClick(task)}
      className='hover:dark:border-accent mx-2 mb-3 flex flex-col justify-between rounded-lg border-[1px] border-stone-200 bg-white px-4 py-2 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800'
    >
      <div className='flex items-center justify-between'>
        <div className='font-thin text-stone-400'>&#8250;&#32;{category}</div>
        <div className={`h-[1rem] w-[1rem] rounded-full ${priorityBgColor}`} />
      </div>

      <div className='flex items-center justify-between'>
        {!isDone && (
          <>
            <h3 className='py-4 pr-4'>{title}</h3>
            <button className='text-accent rounded-full bg-white py-3 hover:text-white'>
              <MdOutlineDone />
            </button>
          </>
        )}
        {isDone && (
          <>
            <h3 className='py-4 pr-4 text-gray-500 line-through'>{title}</h3>
            <button
              disabled
              className='bg-transparent py-3 text-gray-500 hover:bg-transparent'
            >
              <MdDoneAll />
            </button>
          </>
        )}
      </div>
    </li>
  );
};
export default TaskListItem;
