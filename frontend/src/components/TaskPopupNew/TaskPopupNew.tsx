import { FC } from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import Category from '../../models/Category';
// import TaskCard from '../../models/TaskCard';

type Inputs = {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  dueDate: string; // assuming ISO date format (YYYY-MM-DD)
  isDone: boolean;
};

type TaskPopupProps = {
  closeTaskPopup: () => void;
  onAddTask: (task: Inputs) => void;
  categories: Category[];
};

const TaskPopupNew: FC<TaskPopupProps> = ({
  closeTaskPopup,
  onAddTask,
  categories,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const closePopup = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onAddTask(data);
    reset(); // Reset the form fields after submission
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
            <li>
              <IoMdCheckmarkCircleOutline className='icon' />
            </li>
            <li>
              <AiOutlineDelete className='icon' />
            </li>
            <li>
              <AiOutlineEdit className='icon' />
            </li>
            <li>
              <IoMdClose
                onClick={closeTaskPopup}
                className='icon'
                aria-label='Close'
              />
            </li>
          </ul>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              placeholder='Task Title'
              className='focus:border-accent w-full border-b border-stone-400 p-1 text-base outline-none md:text-lg'
              id='title'
              type='text'
              {...register('title', { required: 'This field is required' })}
            />
            {errors.title && <p>{errors.title.message}</p>}
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
          <div className='mb-10 mt-6 grid grid-cols-2 items-end gap-y-4 md:mb-3 md:w-96 md:gap-y-5'>
            <label htmlFor='dueDate'>Due Date:</label>
            <input
              id='dueDate'
              type='date'
              {...register('dueDate', { required: 'This field is required' })}
            />
            {errors.dueDate && <p>{errors.dueDate.message}</p>}
          </div>
          <div className='mb-10 mt-6 grid grid-cols-2 items-end gap-y-4 md:mb-3 md:w-96 md:gap-y-5'>
            <label htmlFor='category'>Category</label>
            <select
              className=' border'
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
          <div>
            <label htmlFor='taskDescription'>Task Description</label>
            <textarea
              className='focus:border-accent flex w-full items-start border border-stone-400 px-2 py-1 outline-none md:text-xl'
              id='description'
              // type='string'
              rows={5}
              {...register('description', {
                required: 'This field is required',
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <button
            type='submit'
            className='bg-accent mt-4 rounded-md px-4 py-2 text-white hover:bg-opacity-80'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopupNew;
