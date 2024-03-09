import { useState, FC } from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import TaskPopupRead from '../TaskPopupRead';
import TaskCard from '../../models/TaskCard';

interface TaskListProps {
  taskListDate: TaskCard[];
  day: string;
}

const TaskList: FC<TaskListProps> = ({ taskListDate, day }) => {
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
      <ul className='md:overflow-hidden'>
        <h4 className='rounded-t-2xl bg-white p-4 font-semibold '>{day}</h4>
        <div className='h-full md:overflow-scroll'>
          <div className='mb-6 rounded-b-2xl bg-white pb-2 shadow-xl md:mb-[5rem] '>
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
        <TaskPopupRead
          zoomedTask={zoomedTask}
          closeTaskPopup={closeTaskPopup}
        />
      )}
    </>
  );
};
export default TaskList;
