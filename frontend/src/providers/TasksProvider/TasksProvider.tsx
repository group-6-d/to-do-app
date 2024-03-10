import { useState, FC, ReactNode } from 'react';
import TasksProviderContext from './TasksProvider.context';
import TaskCard from '../../models/TaskCard';

const fakeData: TaskCard[] = [
  { title: 'Go for a run', category: 'personal', id: 1, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do',},
  { title: 'Finish report for meeting', category: 'work', id: 2, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Buy groceries', category: 'shopping', id: 3, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Buy new running shoes', category: 'shopping', id: 13, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Read a book for an hour', category: 'hobbies', id: 14, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Watch "The Shawshank Redemption"', category: 'movies', id: 15, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Clean out closet', category: 'personal', id: 16, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Attend team meeting', category: 'work', id: 17, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Grocery shopping for the week', category: 'shopping', id: 18, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Practice photography skills', category: 'hobbies', id: 19, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
  { title: 'Watch "Pulp Fiction"', category: 'movies', id: 20, description: 'DescriptionDescriptionDescriptionDescription', dueDate: '2024-11-05', priority: 'high priority', status: 'to do' },
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
