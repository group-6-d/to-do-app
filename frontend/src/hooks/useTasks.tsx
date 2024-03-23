import { useCallback, useEffect, useState } from 'react';

import * as tasksAPI from '../api/tasksApi';
import type TaskCard from '../models/TaskCard';

const getFormattedDate = (tasks: TaskCard[] | null) => {
  tasks?.forEach((task) => {
    if (task.due_date) {
      const dueDate = new Date(task.due_date);
      const year = dueDate.getFullYear();
      let month: string | number = dueDate.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day: string | number = dueDate.getDate();
      day = day < 10 ? '0' + day : day;
      const formattedDueDate = `${year}-${month}-${day}`;
      task.due_date = formattedDueDate;
    }
  });
};

const useTasks = (token: string | null) => {
  const [tasks, setTasks] = useState<TaskCard[] | null>(null);

  const fetchAllTasks = useCallback(async (token: string | null) => {
    if (!token) return;
    try {
      const tasks = (await tasksAPI.fetchAll(token)) as TaskCard[];
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllTasks(token);
  }, [fetchAllTasks, token]);

  getFormattedDate(tasks);

  return { tasks, fetchAllTasks };
};

export default useTasks;
