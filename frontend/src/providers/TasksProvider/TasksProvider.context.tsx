import { createContext } from 'react';
import TaskCard from '../../models/TaskCard';

interface ITasksProvider {
  tasksList: TaskCard[];
  createTask: (data: TaskCard) => void;
  deleteTask: (data: TaskCard) => void;
  editTask: () => void;
}

const TasksContext = createContext<ITasksProvider>({
  tasksList: [],
  createTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
});

export default TasksContext;