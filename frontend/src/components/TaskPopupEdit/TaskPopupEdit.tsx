import { FC, useState } from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import TaskCard from '../../models/TaskCard';
import { getPriorityColor } from '../../utils/utils';

interface TaskPopupProps {
  task: TaskCard | null;
  closeTaskPopup: () => void;
  editTask: (editedTask: TaskCard) => void;
}

const TaskPopupEdit: FC<TaskPopupProps> = ({
  task,
  closeTaskPopup,
  editTask,
}) => {
  const [editedTask, setEditedTask] = useState<TaskCard | null>(task);

  const closePopup = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
  };

  const priorityColor = getPriorityColor(editedTask?.priority);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setEditedTask((prevState) => {
      if (!prevState) return null; // Return null if prevState is null
      return {
        ...prevState,
        [name as keyof TaskCard]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedTask) {
      editTask(editedTask);
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
              <AiOutlineEdit className='icon' onClick={handleSubmit} />
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
          <p className=''>{`${editedTask?.priority} priority`}</p>
        </div>
        <h1 className='mb-2  text-xl font-semibold md:mb-6 md:text-4xl'>
          <input
            type='text'
            name='title'
            value={editedTask?.title}
            onChange={handleInputChange}
            placeholder='Task Title'
            className='focus:border-accent w-full border-b border-stone-400 pb-1 text-lg outline-none md:text-3xl'
          />
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-10 mt-6 grid grid-cols-2 items-end gap-y-4 md:mb-16 md:w-96 md:gap-y-5'>
            <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
              Due date
            </p>
            <input
              type='text'
              name='dueDate'
              value={editedTask?.due_date}
              onChange={handleInputChange}
              placeholder='Due Date'
              className='focus:border-accent w-full border-b border-stone-400 pb-1 text-lg outline-none md:text-xl'
            />
            <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
              Category
            </p>
            <input
              type='text'
              name='category'
              value={editedTask?.category}
              onChange={handleInputChange}
              placeholder='Category'
              className='focus:border-accent w-full border-b border-stone-400 pb-1 text-lg outline-none md:text-xl'
            />
          </div>
          <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
            Description
          </p>
          <textarea
            name='description'
            value={editedTask?.description}
            onChange={handleInputChange}
            placeholder='Description'
            className='focus:border-accent w-full border border-stone-400 px-2 py-1 outline-none md:text-xl'
          />
          <button
            type='submit'
            className='bg-accent mt-4 rounded-md px-4 py-2 text-white hover:bg-opacity-80'
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopupEdit;
