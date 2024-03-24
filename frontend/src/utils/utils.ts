import TaskCard from '../models/TaskCard';

export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'High':
      return 'text-orange';
      break;
    case 'Medium':
      return 'text-yellow';
      break;
    case 'Low':
      return 'text-purple';
      break;
    default:
      return 'text-transparent';
      break;
  }
};

console.log(import.meta);

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174';

export const getFormattedDateForTask = (tasks: TaskCard[] | null) => {
  tasks?.forEach((task) => {
    if (task.due_date) {
      const dueDate = new Date(task.due_date);
      const year = dueDate.getFullYear();
      let month: string | number = dueDate.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day: string | number = dueDate.getDate();
      day = day < 10 ? '0' + day : day;
      const formattedDueDate = `${year}-${month}-${day}`;
      task.due_date = formattedDueDate;
    }
  });
};

export const getFormattedDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDueDate = newDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formattedDueDate;
};
