import { FC } from 'react';
import TaskCard from '../../models/TaskCard';

interface TaskProps {
  task: TaskCard;
  onClick: (task: TaskCard) => void;
}

const TaskListItem: FC<TaskProps> = ({ task, onClick }) => {
  const { id, title, category, priority, isDone } = task;

  let priorityColor: string;
  if (priority === 'high priority') {
    priorityColor = 'bg-orange';
  } else if (priority === 'middle priority') {
    priorityColor = 'bg-yellow';
  } else {
    priorityColor = 'bg-purple';
  }

  return (
    <li
      key={id}
      onClick={() => onClick(task)}
      className='hover:dark:border-accent mx-2 mb-3 flex flex-col justify-between rounded-lg border-[1px] border-stone-200 bg-white px-4 py-2 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800'
    >
      <div className='flex items-center justify-between'>
        <div className='font-thin text-stone-400'>&#8250;&#32;{category}</div>
        <div className={`h-[1rem] w-[1rem] rounded-full ${priorityColor}`} />
      </div>

      <div className='flex items-center justify-between'>
        {!isDone && (
          <>
            <h3 className='py-4 pr-4'>{title}</h3>
            <button>Done</button>
          </>
        )}
        {isDone && (
          <h3 className='py-4 pr-4 text-gray-500 line-through'>{title}</h3>
        )}
      </div>
    </li>
  );
};
export default TaskListItem;
