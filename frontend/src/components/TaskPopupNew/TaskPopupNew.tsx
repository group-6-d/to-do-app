import { FC, useState } from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// import TaskCard from '../../models/TaskCard';

interface TaskPopupProps {
  closeTaskPopup: () => void;
}

interface TaskCard {
  title: string;
  description: string;
  dueDate: string;
  category: string; // Non-optional
  priority: string; // Non-optional
  isDone: boolean;
}

const TaskPopupNew: FC<TaskPopupProps> = ({ closeTaskPopup }) => {
  const [newTask, setNewTask] = useState<TaskCard>({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    priority: '',
    isDone: false,
  });

  const closePopup = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
  };

  // const priorityColor = getPriorityColor(newTask.priority);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can perform actions to save the new task
    // For demonstration, you can log the new task data
    console.log('New Task Data:', newTask);
    // After saving, you may want to close the popup
    closeTaskPopup();
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
              <IoMdClose onClick={closeTaskPopup} className='icon' />
            </li>
          </ul>
        </section>
        <ul className='mx-2 mb-3 rounded-lg border-[1px] border-stone-200 bg-white pb-1 dark:border-stone-700 dark:bg-stone-800'>
          <div className='p-2'>Priority:</div>
          <div className='flex'>
            <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
              <input
                type='checkbox'
                id='high'
                name='high'
                className='checked:bg-coral h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
              />
              <label
                htmlFor='high'
                className='m-0 text-sm  text-stone-900 hover:cursor-pointer dark:text-stone-100'
              >
                High
              </label>
            </li>
            <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
              <input
                type='checkbox'
                id='middle'
                name='middle'
                className='checked:bg-yellow h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
              />
              <label
                htmlFor='middle'
                className='m-0 text-sm text-stone-900 hover:cursor-pointer dark:text-stone-100'
              >
                Middle
              </label>
            </li>
            <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
              <input
                type='checkbox'
                id='low'
                name='low'
                className='checked:bg-purple h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer'
              />
              <label
                htmlFor='low'
                className='m-0 text-sm text-stone-900 hover:cursor-pointer dark:text-stone-100'
              >
                Low
              </label>
            </li>
          </div>
        </ul>
        {/* <div
          className={`mb-3 flex  items-center text-sm font-medium uppercase md:mb-4 md:text-xl ${priorityColor}`}
        >
          <TbPointFilled className='text-4xl' />
          <p className=''>{`${newTask.priority} priority`}</p>
        </div> */}
        <h1 className='mb-2  text-xl font-semibold md:mb-6 md:text-4xl'>
          <input
            type='text'
            name='title'
            value={newTask.title}
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
            {/* <input
              type='text'
              name='dueDate'
              value={newTask.dueDate}
              onChange={handleInputChange}
              placeholder='Due Date'
              className='focus:border-accent w-full border-b border-stone-400 pb-1 text-lg outline-none md:text-xl'
            /> */}

            <div className='relative max-w-sm'>
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                {/* <svg
                  className='h-4 w-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                </svg> */}
              </div>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                placeholder='Select date'
                type='date'
                id='start'
                name='trip-start'
                value={newTask.dueDate}
                min='2018-01-01'
                max='2030-12-31'
              />

              {/* <input
                datepicker
                datepicker-autohide
                type='text'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                placeholder='Select date'
              /> */}
            </div>

            <p className='text-[12px] uppercase text-stone-500 md:text-lg'>
              Category
            </p>
            <input
              type='text'
              name='category'
              value={newTask.category}
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
            value={newTask.description}
            onChange={handleInputChange}
            placeholder='Description'
            className='focus:border-accent w-full border border-stone-400 px-2 py-1 outline-none md:text-xl'
          />
          <button
            type='submit'
            className='bg-accent mt-4 rounded-md px-4 py-2 text-white hover:bg-opacity-80'
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopupNew;
