import { createContext } from 'react';
import TaskCard from '../../models/TaskCard';

interface ITasksProvider {
  taskListDate: TaskCard[];
  getTasksList: () => void;
  createTask: (data: TaskCard) => void;
  deleteTask: (data: TaskCard) => void;
  editTask: () => void;
}

const TasksContext = createContext<ITasksProvider>({
  taskListDate: [],
  getTasksList: () => {},
  createTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
});

export default TasksContext;