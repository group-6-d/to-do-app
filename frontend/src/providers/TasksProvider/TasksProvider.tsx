import { useState, FC, ReactNode } from 'react';
import TasksProviderContext from './TasksProvider.context';
import TaskCard from '../../models/TaskCard';

const fakeData: TaskCard[] = [
  { title: 'Go for a run', category: 'personal', id: 1 },
  { title: 'Finish report for meeting', category: 'work', id: 2 },
  { title: 'Buy groceries', category: 'shopping', id: 3 },
  { title: 'Buy new running shoes', category: 'shopping', id: 13 },
  { title: 'Read a book for an hour', category: 'hobbies', id: 14 },
  { title: 'Watch "The Shawshank Redemption"', category: 'movies', id: 15 },
  { title: 'Clean out closet', category: 'personal', id: 16 },
  { title: 'Attend team meeting', category: 'work', id: 17 },
  { title: 'Grocery shopping for the week', category: 'shopping', id: 18 },
  { title: 'Practice photography skills', category: 'hobbies', id: 19 },
  { title: 'Watch "Pulp Fiction"', category: 'movies', id: 20 },
];

const TasksProvider: FC<{children: ReactNode}> = ({ children }) => {

  const [taskListDate, setTaskListDate] = useState<TaskCard[]>([]);
  
  const getTasksList = () => {
    setTaskListDate(fakeData);
  }
  

  const createTask = (data: TaskCard) => {
    const newCard = {
      id: data.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status,
      categoryId: data.category,
    };
    setTaskListDate((prevList: TaskCard[]) => [...prevList, newCard]);
  };

  const deleteTask = (data: TaskCard) => {
  const updList = taskListDate.filter((card: TaskCard) => card.id !== data.id);
  setTaskListDate(updList);
  }

  const editTask = () => {
  };

  // const archiveTask = () => {

  // }

  const value = {
    taskListDate,
    getTasksList,
    createTask,
    deleteTask,
    editTask,
  };

  return <TasksProviderContext.Provider value={value}>{children}</TasksProviderContext.Provider>;
};

export default TasksProvider;
