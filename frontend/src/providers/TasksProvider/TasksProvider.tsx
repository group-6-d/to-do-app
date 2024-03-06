import { useState, useEffect, FC, ReactNode } from 'react';
import TasksProviderContext from './TasksProvider.context';
import TaskCard from '../../models/TaskCard';

const TasksProvider: FC<{children: ReactNode}> = ({ children }) => {

  const [tasksList, setTasksList] = useState<TaskCard[]>([]);

  useEffect(() => {

  }, [tasksList]);

  const createTask = (data: TaskCard) => {
    const newCard = {
      id: data.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status,
      categoryId: data.categoryId,
    };
    setTasksList((prevList: TaskCard[]) => [...prevList, newCard]);
  };

  const deleteTask = (data: TaskCard) => {
  const updList = tasksList.filter((card: TaskCard) => card.id !== data.id);
  setTasksList(updList);
  }

  const editTask = () => {
  };

  // const archiveTask = () => {

  // }

  const value = {
    tasksList,
    createTask,
    deleteTask,
    editTask,
  };

  return <TasksProviderContext.Provider value={value}>{children}</TasksProviderContext.Provider>;
};

export default TasksProvider;
