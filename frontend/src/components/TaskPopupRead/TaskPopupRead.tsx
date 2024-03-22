import { FC } from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import TaskCard from '../../models/TaskCard';
import { getPriorityColor } from '../../utils/utils';
import { useCategoriesContext } from '../../context/CategoryContext';

interface TaskPopupProps {
  task: TaskCard | null;
  closeTaskPopup: () => void;
}

const TaskPopupRead: FC<TaskPopupProps> = ({ task, closeTaskPopup }) => {
  const priorityColor = getPriorityColor(task?.priority);
  const categories = useCategoriesContext();

  const closePopup = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
  };

  const getCategoryNameById = (categoryId: number) => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div
      id='container'
      className='animate-fade fixed inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-70'
      onClick={closePopup}
    >
      <div className='h-screen/80 relative grid w-[300px] cursor-default content-start overflow-auto rounded-2xl bg-white p-5 md:w-[700px] md:p-10 dark:bg-stone-800'>
        <section
          className='mb-6 flex w-full
  justify-end md:mb-12'
        >
          <ul className='grid grid-cols-4 gap-3 text-xl text-stone-600 md:gap-6 md:text-2xl'>
            {!task?.isDone && (
              <li>
                <IoMdCheckmarkCircleOutline className='icon' />
              </li>
            )}
            <li>
              <AiOutlineDelete className='icon' />
            </li>
            <li>
              <AiOutlineEdit className='icon' />
            </li>
            <li>
              <IoMdClose onClick={closeTaskPopup} className='icon' />
            </li>
          </ul>
        </section>
        <div
          className={`mb-3 flex  items-center text-sm font-medium uppercase md:mb-4 md:text-xl ${priorityColor}`}
        >
          <TbPointFilled className='text-4xl' />
          <p className=''>{`${task?.priority} priority`}</p>
        </div>
        <h1 className='mb-2  text-xl font-semibold md:mb-6 md:text-4xl'>
          {task?.title}
        </h1>
        <div className='mb-10 mt-6 grid grid-cols-2 items-end gap-y-4 md:mb-16 md:w-96 md:gap-y-5'>
          <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
            Due date
          </p>
          {task?.due_date && (
            <p className='font-medium md:text-xl'>
              {new Date(task.due_date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </p>
          )}
          <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
            Category
          </p>
          <p className='text-accent font-medium md:text-xl'>
            {getCategoryNameById(task!.category_id)}
          </p>
          <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
            Status
          </p>
          {task?.status === 'todo' && (
            <p className='text-coral font-medium uppercase md:text-xl'>to do</p>
          )}
          {task?.status === 'done' && (
            <p className='font-medium uppercase text-stone-500 md:text-xl'>
              done
            </p>
          )}
        </div>
        <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
          Description
        </p>
        <p className='my-2 md:my-3 md:text-2xl'>{task?.description}</p>
      </div>
    </div>
  );
};
export default TaskPopupRead;
