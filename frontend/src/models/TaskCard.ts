type TaskCard = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'high priority' | 'middle priority' | 'low priority';
  // change to isDone?
  status?: 'done' | 'to do';
  isDone?: boolean;
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
};

export default TaskCard;
