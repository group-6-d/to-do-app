import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCheckmarkCircleOutline, IoMdClose } from 'react-icons/io';
// import { AiOutlineSave } from 'react-icons/ai';
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
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  //   reset,
  // } = useForm<TaskCard>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskCard>({
    defaultValues: {
      priority: task?.priority,
    },
    mode: 'onChange',
  });

  // useEffect(() => {
  //   if (task) reset(task); // Resets the form with the current task values when the task prop changes
  // }, [task, reset]);

  // const onSubmit = handleSubmit((data) => {
  //   onSaveTask(data);
  //   closeTaskPopup();
  // });

  const onSubmit = (data: TaskCard) => {
    console.log(data);
    onSaveTask(data);
    closeTaskPopup();
  };

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
            {/* <li>
              <IoMdCheckmarkCircleOutline onClick={onSubmit} className='icon' />
            </li> */}
            {/* <li>
              <AiOutlineSave onClick={onSubmit} className='icon' />
            </li> */}
            <li>
              <IoMdClose onClick={closeTaskPopup} className='icon' />
            </li>
          </ul>
        </section>
        {/* <form onSubmit={onSubmit} noValidate> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            {/* <label htmlFor='title' className='mb-2 block text-sm font-medium'>
              Title
            </label> */}
            {/* <input
              id='title' 
              type='text'
              className='input'
              {...register('title', { required: 'Title is required' })}
            /> */}

            {/* we don't need id, because it is the same "...register('title'," */}
            {/* also I added validation */}
            <label>Title</label>
            <input
              className='input'
              {...register('title', {
                required: {
                  value: true,
                  message: 'Title is required',
                },
                minLength: {
                  value: 1,
                  message: 'Minimum length is 1',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 40',
                },
              })}
              type='text'
              defaultValue={task?.title}
            />
            {errors?.title && (
              <div className='md:text-md text-sm text-red-500'>
                {errors.title.message}
              </div>
            )}
          </div>

          <div className=''>
            {/* <label className=' mr-2'>Priority:</label>
            {['High', 'Medium', 'Low'].map((priority) => (
              <label className=' mr-3' key={priority}>
                <input
                  className='checked:bg-coral mr-1 h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
                  type='radio'
                  defaultValue={priority}
                  // value={priority}
                  {...register('priority', {
                    required: 'This field is required',
                  })}
                />
                {priority}
              </label>
            ))}
            {errors.priority && <p>{errors.priority.message}</p>} */}
            <label className=' mr-2'>Priority:</label>
            <div className=' flex'>
              <label>
                <div className=' mr-6 flex'>
                  <input
                    className=' mr-2'
                    type='radio'
                    value='High'
                    {...register('priority')}
                    defaultChecked={task?.priority?.toLowerCase() === 'high'}
                  />
                  High
                </div>
              </label>
              <label>
                <div className=' mr-6 flex'>
                  <input
                    className=' mr-2'
                    type='radio'
                    value='Medium'
                    {...register('priority')}
                    defaultChecked={task?.priority?.toLowerCase() === 'medium'}
                  />
                  Medium
                </div>
              </label>
              <label>
                <div className=' mr-6 flex'>
                  <input
                    className=' mr-2'
                    type='radio'
                    value='Low'
                    {...register('priority')}
                    defaultChecked={task?.priority?.toLowerCase() === 'low'}
                  />
                  Low
                </div>
              </label>
            </div>
          </div>

          <div className='mb-10 mt-6 grid grid-cols-2 items-end gap-y-4 md:mb-16 md:w-96 md:gap-y-5'>
            <label htmlFor='due_date'>Due Date:</label>
            <input
              // id='due_date'
              type='date'
              defaultValue={task?.due_date}
              {...register('due_date', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
            />
            {errors?.due_date && (
              <div className='md:text-md text-sm text-red-500'>
                {errors.due_date.message}
              </div>
            )}
          </div>

          <div>
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              defaultValue={task?.categoryName}
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

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='mb-2 block text-sm font-medium'
            >
              Description
            </label>
            <input
              {...register('description', {
                maxLength: {
                  value: 100,
                  message: 'Maximum length is 100',
                },
              })}
              defaultValue={task?.description}
              type='text'
              className='textarea'
            />
            {errors?.description && (
              <div className='md:text-md text-sm text-red-500'>
                {errors.description.message}
              </div>
            )}
          </div>

          <button
            disabled={!isValid}
            aria-label='Save result'
            className='bg-accent mt-4 rounded-md px-4 py-2 text-white hover:bg-opacity-80'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopupEdit;
