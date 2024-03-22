import { FC } from 'react';
import TaskCard from '../../models/TaskCard';
import { getPriorityColor } from '../../utils/utils';
import { MdOutlineDone, MdDoneAll } from 'react-icons/md';
import { TbPointFilled } from 'react-icons/tb';
import { useCategoriesContext } from '../../providers/CategoryProvider';

interface TaskProps {
  task: TaskCard;
  onClick: (task: TaskCard) => void;
}

const TaskListItem: FC<TaskProps> = ({ task, onClick }) => {
  const { id, title, priority, isDone } = task;
  const priorityColor = getPriorityColor(priority);
  const categories = useCategoriesContext();

  const getCategoryNameById = (categoryId: number) => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <li
      key={id}
      onClick={() => onClick(task)}
      className='hover:dark:border-accent mx-2 mb-3 flex flex-col justify-between rounded-lg border-[1px] border-stone-200 bg-white px-4 py-2 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800'
    >
      <div className='flex items-center justify-between'>
        <div className='font-thin text-stone-400'>
          &#8250;&#32;{getCategoryNameById(task.category_id)}
        </div>
        <TbPointFilled className={`text-4xl ${priorityColor}`} />
      </div>

      <div className='flex items-center justify-between'>
        {!isDone && (
          <>
            <h3 className='py-4 pr-4'>{title}</h3>
            <button className='text-accent hover:bg-accent rounded-full bg-white p-3 hover:text-white dark:bg-stone-800 hover:dark:bg-stone-600'>
              <MdOutlineDone />
            </button>
          </>
        )}
        {isDone && (
          <>
            <h3 className='py-4 pr-4 text-stone-500 line-through'>{title}</h3>
            <button
              disabled
              className='bg-transparent py-3 text-stone-500 hover:bg-transparent'
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
