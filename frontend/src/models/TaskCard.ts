type TaskCard = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'high' | 'middle' | 'low';
  isDone?: boolean;
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
};

export default TaskCard;
