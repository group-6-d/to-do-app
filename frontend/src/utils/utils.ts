export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'text-orange';
      break;
    case 'middle':
      return 'text-yellow';
      break;
    case 'low':
      return 'text-purple';
      break;
    default:
      break;
  }
};
