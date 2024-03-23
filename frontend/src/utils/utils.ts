export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'text-orange';
      break;
    case 'medium':
      return 'text-yellow';
      break;
    case 'low':
      return 'text-purple';
      break;
    default:
      break;
  }
};

console.log(import.meta);

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174';
