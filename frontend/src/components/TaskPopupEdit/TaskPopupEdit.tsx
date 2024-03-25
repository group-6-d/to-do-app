import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import TaskCard from '../../models/TaskCard';
import Category from '../../models/Category';
import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';

interface TaskPopupEditProps {
  task: TaskCard;
  closeTaskPopup: () => void;
  onUpdateTask: (updatedTask: TaskCard) => void; // Handler to save the edited task
  categories: Category[];
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskCard | null>>;
}

const TaskPopupEdit: FC<TaskPopupEditProps> = ({
  task,
  closeTaskPopup,
  categories,
  setIsEditMode,
  setCurrentTask,
}) => {
  const { editTask, createTask } = useTasksBoard();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskCard>({
    defaultValues: {
      priority: task?.priority,
      status: task?.status,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: TaskCard) => {
    if (data.id) {
      editTask(data);
    } else {
      createTask(data);
    }
    setIsEditMode(false);
    setCurrentTask(data);
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
        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col'>
          <input
            type='hidden'
            defaultValue={task?.id ?? undefined}
            {...register('id')}
          />
          <input
            type='hidden'
            defaultValue={task?.user_id ?? undefined}
            {...register('user_id')}
          />

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
          <div className=' my-10 grid items-end justify-end gap-y-2 md:mb-16 md:w-[400px] md:grid-cols-2 md:gap-y-8'>
            <label className='task_form_label'>Priority:</label>
            <div className=' flex flex-col md:flex-row'>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
                    type='radio'
                    value='high'
                    {...register('priority')}
                    defaultChecked={task?.priority === 'high'}
                  />
                  high
                </div>
              </label>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
                    type='radio'
                    value='medium'
                    {...register('priority')}
                    defaultChecked={task?.priority?.toLowerCase() === 'medium'}
                  />
                  medium
                </div>
              </label>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
                    type='radio'
                    value='low'
                    {...register('priority')}
                    defaultChecked={task?.priority?.toLowerCase() === 'low'}
                  />
                  low
                </div>
              </label>
            </div>

            <label className='task_form_label' htmlFor='due_date'>
              Due Date:
            </label>
            <input
              className=' m-0 block h-10 w-44 rounded-lg border border-gray-200 p-2 text-lg'
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

            <label className='task_form_label' htmlFor='category'>
              Category
            </label>
            <select
              id='category'
              className=' block h-10 w-44 rounded-lg border border-gray-200 px-2 text-xl'
              defaultValue={task?.category_id}
              {...register('category_id', {
                required: 'This field is required',
              })}
            >
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p>{errors.category.message}</p>}

            <label className='task_form_label'>Status:</label>
            <div className=' flex '>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
                    type='radio'
                    value='to do'
                    {...register('status')}
                    defaultChecked={task?.status?.toLowerCase() === 'to do'}
                  />
                  to do
                </div>
              </label>
              <label>
                <div className=' mr-6 flex text-xl'>
                  <input
                    className=' mr-2 w-5'
                    type='radio'
                    value='done'
                    {...register('status')}
                    defaultChecked={task?.status?.toLowerCase() === 'done'}
                  />
                  done
                </div>
              </label>
            </div>
          </div>

          <div className=' flex flex-col'>
            <label htmlFor='description' className='task_form_label'>
              Description
            </label>
            <textarea
              {...register('description', {
                maxLength: {
                  value: 300,
                  message: 'Maximum length is 300',
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
