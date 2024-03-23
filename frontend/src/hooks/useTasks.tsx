import { useCallback, useEffect, useState } from 'react';
import * as tasksAPI from '../api/tasksApi';
import { getFormattedDate } from '../utils/utils';
import type TaskCard from '../models/TaskCard';

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
