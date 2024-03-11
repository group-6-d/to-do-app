type TaskCard = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'high' | 'middle' | 'low';
  // change to isDone?
  status?: 'done' | 'to do';
  isDone?: boolean;
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
};

export default TaskCard;
