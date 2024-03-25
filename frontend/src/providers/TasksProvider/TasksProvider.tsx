// TODO: For our safety we need to remove @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, FC, ReactNode } from 'react';
import TasksProviderContext from './TasksProvider.context';
import useTasks from '../../hooks/useTasks';
import * as taskApi from '../../api/tasksApi';
import type TaskCard from '../../models/TaskCard';

const TasksProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [allTasks, setAllTasks] = useState<TaskCard[]>([]);
  const { tasks, fetchAllTasks } = useTasks();

  const getTasks = (updatedTasks) => {
    setAllTasks(updatedTasks);
  };

  const editTask = async (data: TaskCard) => {
    try {
      const token = localStorage.getItem('token');
      const editedTask = await taskApi.editTask(data, token);
      setAllTasks((prevTasks) => {
        const updatedTask = prevTasks.filter(
          (task) => task.id !== editedTask.id,
        );
        return [...updatedTask, editedTask];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async (data: TaskCard) => {
    try {
      const token = localStorage.getItem('token');
      taskApi.createNewTask(data, token).then((res) => {
        const newTask = {
          id: res.id,
          title: res.title,
          description: res.description,
          due_date: res.due_date,
          status: res.status,
          user_id: res.user_id,
          category_id: res.category_id,
          categoryName: res.categoryName,
        };
        const updTaskList = [...allTasks, newTask];
        setAllTasks(updTaskList);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (data: TaskCard) => {
    try {
      const token = localStorage.getItem('token');
      await taskApi.deleteTask(data.id, token);

      // TODO: what if `deleteTask()` throws errors?
      setAllTasks(allTasks.filter((task) => task.id !== data.id));
    } catch (err) {
      console.error(err);
    }
  };

  const refreshTasks = async () => {
    const token = localStorage.getItem('token');
    const tasks = await fetchAllTasks(token);
    getTasks(tasks);
  };

  const markDone = async (data: TaskCard) => {
    try {
      const token = localStorage.getItem('token');
      const editedTask = await taskApi.editTask(data, token);

      setAllTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editedTask.id ? { ...task, status: 'done' } : task,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  refreshTasks();

  const value = {
    allTasks,
    tasks,
    getTasks,
    createTask,
    deleteTask,
    editTask,
    refreshTasks,
    markDone,
  };

  return (
    <TasksProviderContext.Provider value={value}>
      {children}
    </TasksProviderContext.Provider>
  );
};

export default TasksProvider;
