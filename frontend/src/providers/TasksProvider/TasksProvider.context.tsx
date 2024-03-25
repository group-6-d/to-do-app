import { createContext } from 'react';
import TaskCard from '../../models/TaskCard';
// import Category from '../../models/Category';

interface ITasksProvider {
  //? dont have these ones - to delete?
  // taskListDate: TaskCard[];
  // categoryListDate: Category[];
  // getTasksList: () => void;
  // getCategoryList: () => void;
  createTask: (data: TaskCard) => void;
  deleteTask: (data: TaskCard) => void;
  editTask: (data: TaskCard) => void;
  allTasks: TaskCard[];
  tasks: TaskCard[];
  getTasks: (tasks: TaskCard[]) => void;
  refreshTasks: () => void;
  markDone: (data: TaskCard) => void;
}

const TasksContext = createContext<ITasksProvider>({
  //? dont have these ones - to delete?
  // taskListDate: [],
  // categoryListDate: [],
  // getTasksList: () => {},
  // getCategoryList: () => {},
  createTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  allTasks: [],
  tasks: [],
  getTasks: () => null,
  refreshTasks: () => null,
  markDone: () => null,
});

export default TasksContext;
