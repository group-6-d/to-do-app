import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
// import { AiOutlineSave } from 'react-icons/ai';
import TaskCard from '../../models/TaskCard';
import Category from '../../models/Category';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
// import { getPriorityColor } from '../../utils/utils';

interface TaskPopupEditProps {
  task: TaskCard;
  closeTaskPopup: () => void;
  onUpdateTask: (updatedTask: TaskCard) => void; // Handler to save the edited task
  categories: Category[];
}

const TaskPopupEdit: FC<TaskPopupEditProps> = ({
  task,
  closeTaskPopup,
  categories,
  setIsEditMode,
  setCurrentTask,
}) => {
  const { editTask } = useTasksBoard();

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

  const onSubmit = (data: TaskCard) => {
    console.log(data);
    // onSaveTask(data);
    editTask(data);
    setIsEditMode(false)
    setCurrentTask(data);
    // closeTaskPopup();
  };

  return (
    <div
      id='container'
      className=' fixed inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-70'
      onClick={(event) => {
        if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
      }}
    >
      <div
        className='h-screen/80 relative grid w-[300px] cursor-default content-start overflow-auto rounded-2xl bg-white p-5 md:w-[700px] md:px-10 dark:bg-stone-800'
        onClick={(e) => e.stopPropagation()} // Prevents click inside from closing
      >
        <section className='mb-6 flex w-full justify-end md:mb-12'>
          <IoMdClose onClick={closeTaskPopup} className='icon' />
        </section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=' grid grid-rows-6 gap-2'
        >
          <input type='hidden' defaultValue={task?.id} {...register('id')} />

          <div className=' flex flex-col'>
            <label className='task_form_label'>Title</label>
            <input
              className='task_form_input'
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

          <div className=' flex flex-col'>
            <label className='task_form_label'>Priority:</label>
            <div className=' flex'>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
                    type='radio'
                    value='High'
                    {...register('priority')}
                    defaultChecked={task?.priority?.toLowerCase() === 'high'}
                  />
                  High
                </div>
              </label>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
                    type='radio'
                    value='Medium'
                    {...register('priority')}
                    defaultChecked={task?.priority?.toLowerCase() === 'medium'}
                  />
                  Medium
                </div>
              </label>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
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

          <div className=' flex flex-col'>
            <label className='task_form_label' htmlFor='due_date'>
              Due Date:
            </label>
            <input
              // className='task_form_input'
              className=' block w-44 h-10 text-lg border border-gray-200 rounded-lg m-0 p-2'
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

          <div className=' flex flex-col'>
            <label className='task_form_label' htmlFor='category'>
              Category
            </label>
            <select
              id='category'
              className=' block w-44 h-10 text-xl border border-gray-200 rounded-lg px-2'
              defaultValue={task?.category_id}
              {...register('category_id', { required: 'This field is required' })}
            >
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p>{errors.category.message}</p>}
          </div>

          <div className=' flex flex-col'>
            <label htmlFor='description' className='task_form_label'>
              Description
            </label>
            <textarea
              {...register('description', {
                maxLength: {
                  value: 100,
                  message: 'Maximum length is 100',
                },
              })}
              defaultValue={task?.description}
              className=' dark:bg-stone-800; w-full rounded-lg border border-gray-200 bg-white p-2 md:text-xl dark:border-stone-700'
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
            className='bg-accent mt-8 h-14 w-36 rounded-md p-2 text-xl text-white hover:bg-opacity-80'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopupEdit;
