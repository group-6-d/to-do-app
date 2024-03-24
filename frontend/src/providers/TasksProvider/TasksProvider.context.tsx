import { createContext } from 'react';
import TaskCard from '../../models/TaskCard';
import Category from '../../models/Category';

interface ITasksProvider {
  taskListDate: TaskCard[];
  categoryListDate: Category[];
  getTasksList: () => void;
  getCategoryList:() => void;
  createTask: (data: TaskCard) => void;
  deleteTask: (data: TaskCard) => void;
  editTask: (data: TaskCard) => void;
}

const TasksContext = createContext<ITasksProvider>({
  taskListDate: [],
  categoryListDate: [],
  getTasksList: () => {},
  getCategoryList: () => {},
  createTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
});

export default TasksContext;