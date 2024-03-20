import { useCallback, useEffect, useState } from 'react';

import * as tasksAPI from '../api/tasksApi';
import type TaskCard from '../models/TaskCard';

// type TaskCard = {
//   id: number;
//   title: string;
//   description?: string;
//   dueDate?: string;
//   priority?: 'high' | 'middle' | 'low';
//   isDone?: boolean;
//   status?: string;
//   category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies' | 'other';
// };

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

  return { tasks, fetchAllTasks };
};

export default useTasks;
