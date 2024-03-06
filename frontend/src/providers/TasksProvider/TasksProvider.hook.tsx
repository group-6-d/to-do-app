import { useContext } from 'react';
import TasksProviderContext from './TasksProvider.context';

const useTasksBoard = () => {
  return useContext(TasksProviderContext);
};

export default useTasksBoard;