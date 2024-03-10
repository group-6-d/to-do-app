type TaskCard = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'high priority' | 'middle priority' | 'low priority';
  status?: 'done' | 'to do';
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
};

export default TaskCard;
