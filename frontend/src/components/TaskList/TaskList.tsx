import { useState, FC } from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
// import TaskManager from '../TaskManager'; // Adjust the import to your setup
import TaskCard from '../../models/TaskCard';
import TaskManager from '../TaskManager';

interface TaskListProps {
  taskList: TaskCard[];
  day: string;
  date?: string;
}

const TaskList: FC<TaskListProps> = ({ taskList, day, date }) => {
  const [isTaskManagerOpen, setIsTaskManagerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskCard | null>(null);

  const openTaskPopup = (task: TaskCard | null) => {
    setSelectedTask(task);
    setIsTaskManagerOpen(true);
  };

  const closeTaskManager = () => {
    setSelectedTask(null);
    setIsTaskManagerOpen(false);
  };

  return (
    <>
      <ul className='min-w-[330px] md:overflow-hidden'>
        <h4 className='mx-3 rounded-t-2xl bg-white p-4 font-semibold dark:bg-stone-800'>
          <span>{day}</span>
          <span className='text-stone-400'>&nbsp;&nbsp;{date}</span>
        </h4>

        <div className='h-full px-3 md:overflow-scroll'>
          <div className='mb-6 rounded-b-2xl bg-white pb-2  shadow-xl md:mb-[5rem] dark:bg-stone-800'>
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
      {isTaskManagerOpen && selectedTask && (
        <TaskManager task={selectedTask} closeTaskManager={closeTaskManager} />
      )}
    </>
  );
};

export default TaskList;
