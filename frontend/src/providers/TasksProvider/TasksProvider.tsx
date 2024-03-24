// TODO: For our safety we need to remove @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, FC, ReactNode, useEffect } from 'react';
import TasksProviderContext from './TasksProvider.context';
import useTasks from '../../hooks/useTasks';
import * as taskApi from '../../api/tasksApi';
import type TaskCard from '../../models/TaskCard';

const TasksProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [allTasks, setAllTasks] = useState<TaskCard[]>([]);
  const token = localStorage.getItem('token');
  const { tasks } = useTasks(token);

  const getTasks = (updatedTasks) => {
    setAllTasks(updatedTasks);
  };

  useEffect(() => {
    getTasks(tasks);
  }, [tasks]);

  const editTask = (data: TaskCard) => {
    const token = localStorage.getItem('token');
    taskApi.editTask(data, token).catch((err) => {
      console.log(err);
    });
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
    // todo: add this when logic is ready
    // setAllTasks((prevList) => [...prevList, newCard]);
  };

  const deleteTask = async (data: TaskCard) => {
    try {
      taskApi
        .deleteTask(data.id, token)
        .then((res) => console.log('deleted!', res))
        .catch((err) => console.error(err));

      setAllTasks(allTasks.filter((task) => task.id !== data.id));
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    allTasks,
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
