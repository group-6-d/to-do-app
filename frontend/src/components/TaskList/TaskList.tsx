import { useState, FC } from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
// import TaskManager from '../TaskManager'; // Adjust the import to your setup
import TaskCard from '../../models/TaskCard';
import TaskManager from '../TaskManager';

interface TaskListProps {
  taskList: TaskCard[];
  day: string;
}

const TaskList: FC<TaskListProps> = ({ taskList, day }) => {
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
      <ul className='min-w-[290px] md:overflow-hidden'>
        <h4 className='rounded-t-2xl bg-white p-4 font-semibold dark:bg-stone-800 '>
          {day}
        </h4>
        <div className='h-full md:overflow-scroll'>
          <div className='mb-6 rounded-b-2xl bg-white pb-2 shadow-xl md:mb-[5rem] dark:bg-stone-800 '>
            {taskList.map((task) => (
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
