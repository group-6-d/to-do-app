import { useCallback, useState } from 'react';
import * as tasksAPI from '../api/tasksApi';
import { getFormattedDateForTask } from '../utils/utils';
import type TaskCard from '../models/TaskCard';

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskCard[]>([]);

  const fetchAllTasks = useCallback(async (token: string | null) => {
    if (!token) return;
    try {
      const tasks = await tasksAPI.fetchAll(token);
      setTasks(tasks);
      getFormattedDateForTask(tasks);
      return tasks;
    } catch (error) {
      console.error(error);
    }
    return [];
  }, []);

  return { tasks, fetchAllTasks };
};

export default useTasks;
