import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineSave } from 'react-icons/ai';
import TaskCard from '../../models/TaskCard';
import Category from '../../models/Category';
// import { getPriorityColor } from '../../utils/utils';

interface TaskPopupEditProps {
  task: TaskCard;
  closeTaskPopup: () => void;
  onSaveTask: (updatedTask: TaskCard) => void; // Handler to save the edited task
  categories: Category[];
}

const TaskPopupEdit: FC<TaskPopupEditProps> = ({
  task,
  closeTaskPopup,
  onSaveTask,
  categories,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskCard>();

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

          <div className='my-6  bg-white pb-1 dark:border-stone-700 dark:bg-stone-800'>
            <label className=' mr-2'>Priority:</label>
            {['High', 'Medium', 'Low'].map((priority) => (
              <label className=' mr-3' key={priority}>
                <input
                  className='checked:bg-coral mr-1 h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
                  type='radio'
                  value={priority}
                  {...register('priority', {
                    required: 'This field is required',
                  })}
                />
                {priority}
              </label>
            ))}
            {errors.priority && <p>{errors.priority.message}</p>}
          </div>

          <div className='mb-10 mt-6 grid grid-cols-2 items-end gap-y-4 md:mb-16 md:w-96 md:gap-y-5'>
            <label htmlFor='due_date'>Due Date:</label>
            <input
              id='due_date'
              type='date'
              {...register('due_date', { required: 'This field is required' })}
            />
            {errors.due_date && <p>{errors.due_date.message}</p>}
          </div>

          <div>
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              {...register('category', { required: 'This field is required' })}
            >
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p>{errors.category.message}</p>}
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
