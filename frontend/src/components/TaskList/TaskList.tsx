import { useState, FC } from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import TaskPopupRead from '../TaskPopupRead';
import TaskCard from '../../models/TaskCard';

interface TaskListProps {
  taskList: TaskCard[];
  day: string;
}

const TaskList: FC<TaskListProps> = ({ taskList, day }) => {
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
          {day}
        </h4>
        <div className='h-full md:overflow-scroll'>
          <div className='mb-6 rounded-b-2xl bg-white pb-2 shadow-xl md:mb-[5rem] dark:bg-stone-800 '>
            {!taskList && (
              <li className='hover:dark:border-accent mx-2 mb-3 flex cursor-default flex-col justify-between rounded-lg border-[1px] border-stone-200 bg-white px-4  py-2 dark:border-stone-700 dark:bg-stone-800'>
                No tasks
              </li>
            )}
            {taskList &&
              taskList.map((task) => (
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
