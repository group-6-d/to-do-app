import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineSave } from 'react-icons/ai';
import TaskCard from '../../models/TaskCard';
// import { getPriorityColor } from '../../utils/utils';

interface TaskPopupEditProps {
  task: TaskCard;
  closeTaskPopup: () => void;
  onSaveTask: (updatedTask: TaskCard) => void; // Handler to save the edited task
}

const TaskPopupEdit: FC<TaskPopupEditProps> = ({
  task,
  closeTaskPopup,
  onSaveTask,
}) => {
  const { register, handleSubmit, reset } = useForm<TaskCard>();

  useEffect(() => {
    if (task) reset(task); // Resets the form with the current task values when the task prop changes
  }, [task, reset]);

  const onSubmit = handleSubmit((data) => {
    onSaveTask(data);
    closeTaskPopup();
  });

  return (
    <div
      id='container'
      className='animate-fade fixed inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-70'
      onClick={(event) => {
        if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
      }}
    >
      <div
        className='h-screen/80 relative grid w-[300px] cursor-default content-start overflow-auto rounded-2xl bg-white p-5 md:w-[700px] md:p-10 dark:bg-stone-800'
        onClick={(e) => e.stopPropagation()} // Prevents click inside from closing
      >
        <section className='mb-6 flex w-full justify-end md:mb-12'>
          <ul className='grid grid-cols-2 gap-3 text-xl text-stone-600 md:gap-6 md:text-2xl'>
            <li>
              <AiOutlineSave onClick={onSubmit} className='icon' />
            </li>
            <li>
              <IoMdClose onClick={closeTaskPopup} className='icon' />
            </li>
          </ul>
        </section>
        <form onSubmit={onSubmit} noValidate>
          {/* Task Title */}
          <div className='mb-4'>
            <label htmlFor='title' className='mb-2 block text-sm font-medium'>
              Title
            </label>
            <input
              id='title'
              type='text'
              className='input'
              {...register('title', { required: 'Title is required' })}
            />
          </div>

          {/* Task Description */}
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='mb-2 block text-sm font-medium'
            >
              Description
            </label>
            <textarea
              id='description'
              className='textarea'
              {...register('description')}
            />
          </div>

          {/* Additional fields like Priority, Category, Due Date, etc., can be added here in a similar fashion */}
        </form>
      </div>
    </div>
  );
};

export default TaskPopupEdit;
