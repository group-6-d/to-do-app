type TaskCard = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'high' | 'middle' | 'low';
  isDone?: boolean;
  status?: string;
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies' | 'other';
};
// export type TaskCardcategory='personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
export default TaskCard;
