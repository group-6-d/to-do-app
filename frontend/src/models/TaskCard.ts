type TaskCard = {
  id: number | null;
  user_id: number | null;
  title: string;
  description?: string;
  due_date?: string;
  priority?: 'high' | 'middle' | 'low';
  // isDone?: boolean;
  status?: string;
  category_id: number;
  categoryName: string;

  // todo: will be deleted
  category?: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies' | 'other';
};

export default TaskCard;
