export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'orange';
      break;
    case 'middle':
      return 'yellow';
      break;
    case 'low':
      return 'purple';
      break;
    default:
      return 'no such priority';
      break;
  }
};
