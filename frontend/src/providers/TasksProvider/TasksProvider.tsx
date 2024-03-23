// TODO: For our safety we need to remove @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, FC, ReactNode } from 'react';
import TasksProviderContext from './TasksProvider.context';
import useTasks from '../../hooks/useTasks';

import type TaskCard from '../../models/TaskCard';
import type Category from '../../models/Category';

const TasksProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [tasks, setTasks] = useState<TaskCard[]>([]);
  const token = localStorage.getItem('token');
  const { tasks } = useTasks(token);

  const getTasks = () => {
    setTasks(tasks);
  };

  const createTask = (data: TaskCard) => {
    const newCard = {
      id: data.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      isDone: data.isDone,
      status: data.status,
      categoryId: data.category,
    };
    setTasks((prevList: TaskCard[]) => [...prevList, newCard]);
  };

  const deleteTask = (data: TaskCard) => {
    const updList = tasks.filter((card: TaskCard) => card.id !== data.id);
    setTasks(updList);
  };

  const editTask = () => {};

  const value = {
    tasks,
    getTasks,
    createTask,
    deleteTask,
    editTask,
  };

  return (
    <TasksProviderContext.Provider value={value}>
      {children}
    </TasksProviderContext.Provider>
  );
};

export default TasksProvider;
