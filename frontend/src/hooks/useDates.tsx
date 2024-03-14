const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (date: Date) => {
  const dayNumber = date.getDate();
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  return `${dayNumber} ${monthName}`;
};

export const useDates = () => {
  const todayDate = new Date();
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const formattedDateToday = formatDate(todayDate);
  const formattedDateTomorrow = formatDate(tomorrowDate);

  return { formattedDateToday, formattedDateTomorrow };
};
