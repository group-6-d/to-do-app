import { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import type TaskCard from '../../models/TaskCard';
import { getPriorityColor } from '../../utils/utils';
import { useCategoriesContext } from '../../context/CategoryContext';
import { getFormattedDate } from '../../utils/utils';
import type Category from '../../models/Category';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';

interface TaskPopupProps {
  task: TaskCard | null;
  closeTaskPopup: () => void;
  onEditClick: () => void;
}

const TaskPopupRead: FC<TaskPopupProps> = ({
  task,
  closeTaskPopup,
  onEditClick,
}) => {
  const { deleteTask } = useTasksBoard();
  const priorityColor = getPriorityColor(task?.priority);
  const categories = useCategoriesContext();

  const arrCategories = Object.values(categories).flat();

  const closePopup = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
  };

  const getCategoryNameById = (categoryId: number) => {
    const category = arrCategories?.find(
      (cat: Category) => cat.id === categoryId,
    );
    return category ? category.name : 'Unknown Category';
  };

  const handleDeleteTask = (data: TaskCard | null) => {
    if (data) {
      deleteTask(data);
      closeTaskPopup();
    }
  };

  return (
    <div
      id='container'
      className='animate-fade fixed inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-70'
      onClick={closePopup}
    >
      <div className='h-screen/80 relative grid w-[300px] cursor-default content-start overflow-auto rounded-2xl bg-white p-5 md:w-[700px] md:p-10 dark:bg-stone-800'>
        <section className='mb-6 flex w-full justify-end md:mb-12'>
          <ul className='fixed grid grid-cols-3 gap-3 rounded-sm bg-white md:gap-6 md:p-4'>
            <li>
              <AiOutlineDelete
                className='icon'
                onClick={() => handleDeleteTask(task)}
              />
            </li>
            <li>
              <AiOutlineEdit className='icon' onClick={onEditClick} />
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
              {getFormattedDate(task.due_date)}
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

          {task?.status === 'done' ? (
            <p className='font-medium uppercase text-stone-500 md:text-xl'>
              done
            </p>
          ) : (
            <p className='text-coral font-medium uppercase md:text-xl'>to do</p>
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
