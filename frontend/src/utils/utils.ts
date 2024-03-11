export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'bg-orange';
      break;
    case 'middle':
      return 'bg-yellow';
      break;
    case 'low':
      return 'bg-purple';
      break;
    default:
      return 'no such priority';
      break;
  }
};
