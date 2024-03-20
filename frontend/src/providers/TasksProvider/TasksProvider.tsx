// TODO: For our safety we need to remove @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, FC, ReactNode } from 'react';
import TasksProviderContext from './TasksProvider.context';
import TaskCard from '../../models/TaskCard';
import Category from '../../models/Category';
import useTasks from '../../hooks/useTasks';

const getFakeToday = () => {
  // const currentDate = new Date();
  // const day = currentDate.getDate().toString().padStart(2, '0');
  // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  // const year = currentDate.getFullYear();

  // return `${day}-${month}-${year}`;
  return new Date().toLocaleDateString();
};

const getFakeTomorrow = () => {
  // const currentDate = new Date();
  // const tomorrowDate = new Date(currentDate);
  // tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  // const day = tomorrowDate.getDate().toString().padStart(2, '0');
  // const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, '0');
  // const year = tomorrowDate.getFullYear();

  // return `${day}-${month}-${year}`;
  return new Date(Date.now() + 86400000).toLocaleDateString();
};

const fakeData: TaskCard[] = [
  {
    title: 'Go for a run',
    category: 'personal',
    isDone: true,
    id: 1,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: getFakeToday(),
    priority: 'high',
  },
  {
    title: 'Finish report for meeting',
    category: 'work',
    id: 2,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: getFakeToday(),
    priority: 'middle',
  },
  {
    title: 'Buy groceries',
    category: 'shopping',
    id: 3,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: getFakeTomorrow(),
    priority: 'high',
  },
  {
    title: 'Buy new running shoes',
    category: 'shopping',
    id: 13,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: '',
    priority: 'high',
  },
  {
    title: 'Read a book for an hour',
    category: 'hobbies',
    isDone: true,
    id: 14,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: getFakeTomorrow(),
    priority: 'middle',
  },
  {
    title: 'Watch "The Shawshank Redemption"',
    category: 'movies',
    isDone: true,
    id: 15,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: '',
    priority: 'low',
  },
  {
    title: 'Clean out closet',
    category: 'personal',
    isDone: true,
    id: 16,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: getFakeToday(),
    priority: 'high',
  },
  {
    title: 'Attend team meeting',
    category: 'work',
    id: 17,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: getFakeTomorrow(),
    priority: 'middle',
  },
  {
    title: 'Grocery shopping for the week',
    category: 'shopping',
    id: 18,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: '',
    priority: 'high',
  },
  {
    title: 'Practice photography skills',
    category: 'hobbies',
    isDone: true,
    id: 19,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: '',
    priority: 'middle',
  },
  {
    title: 'Watch "Pulp Fiction"',
    category: 'movies',
    isDone: true,
    id: 20,
    description: 'DescriptionDescriptionDescriptionDescription',
    dueDate: '',
    priority: 'low',
  },
];

const fakeCategories: Category[] = [
  {
    name: 'hobbies',
    id: 1,
    // src: '',
  },
  {
    name: 'movies',
    id: 1,
    // src: '',
  },
  {
    name: 'shopping',
    id: 1,
    // src: '',
  },
  {
    name: 'work',
    id: 1,
    // src: '',
  },
  {
    name: 'personal',
    id: 1,
    // src: '',
  },
];

const TasksProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [taskListDate, setTaskListDate] = useState<TaskCard[]>([]);
  const [categoryListDate, setCategoryListDate] = useState<Category[]>([]);

  const token = localStorage.getItem('token');
  const { tasks } = useTasks(token);
  console.log('tasks in task provider', tasks);

  const getTasksList = () => {
    // setTaskListDate(fakeData);
    setTaskListDate(tasks);
  };

  //? we use category from backend only in sidebar for now => create separate categoryProvider
  const getCategoryList = () => {
    setCategoryListDate(fakeCategories);
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
    setTaskListDate((prevList: TaskCard[]) => [...prevList, newCard]);
  };

  const deleteTask = (data: TaskCard) => {
    const updList = taskListDate.filter(
      (card: TaskCard) => card.id !== data.id,
    );
    setTaskListDate(updList);
  };

  const editTask = () => {};

  // const archiveTask = () => {

  // }

  const value = {
    taskListDate,
    categoryListDate,
    getTasksList,
    getCategoryList,
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
