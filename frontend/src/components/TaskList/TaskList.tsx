import { useState, FC } from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import TaskPopupRead from '../TaskPopupRead';
import TaskCard from '../../models/TaskCard';

interface TaskListProps {
  taskListDate: TaskCard[];
  day: string;
  date?: string;
}

const TaskList: FC<TaskListProps> = ({ taskListDate, day, date }) => {
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [zoomedTask, setZoomedTask] = useState<TaskCard | null>(null);

  const openTaskPopup = (task: TaskCard | null) => {
    setZoomedTask(task);
    setIsTaskPopupOpen(true);
  };

  const closeTaskPopup = () => {
    setZoomedTask(null);
    setIsTaskPopupOpen(false);
  };

  return (
    <>
      <ul className='min-w-[290px] md:overflow-hidden'>
        <h4 className='rounded-t-2xl bg-white p-4 font-semibold dark:bg-stone-800 '>
          {day}&nbsp;<span className='text-stone-500'>{date}</span>
        </h4>
        <div className='h-full md:overflow-scroll'>
          <div className='mb-6 rounded-b-2xl bg-white pb-2 shadow-xl md:mb-[5rem] dark:bg-stone-800 '>
            {taskListDate.map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
                onClick={() => openTaskPopup(task)}
              />
            ))}
          </div>
        </div>
      </ul>
      {isTaskPopupOpen && (
        <TaskPopupRead task={zoomedTask} closeTaskPopup={closeTaskPopup} />
      )}
    </>
  );
};
export default TaskList;
