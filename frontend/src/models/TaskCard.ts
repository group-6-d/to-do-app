type TaskCard = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
};

export default TaskCard;
