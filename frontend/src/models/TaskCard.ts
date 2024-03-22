type TaskCard = {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  priority?: 'high' | 'middle' | 'low';
  isDone?: boolean;
  status?: string;
  category_id: number;

  // todo: will be deleted
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies' | 'other';
};
// export type TaskCardcategory='personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
export default TaskCard;
