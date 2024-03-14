// import { useState, useEffect } from 'react';
// import SideBar from '../../components/SideBar/SideBar';
// import TaskList from '../../components/TaskList/TaskList';
// import useTasksBoard from '../../providers/TasksProvider/TasksProvider.hook';
// import { useDates } from '../../hooks/useDates';
// import type TaskCard from '../../models/TaskCard';

// const MainPage = () => {
//   const { getTasksList, taskListDate, getCategoryList, categoryListDate } =
//     useTasksBoard();
//   const { formattedDateToday, formattedDateTomorrow } = useDates();
//   const [tasksToday, setTasksToday] = useState<TaskCard[]>([]);
//   const [tasksTomorrow, setTasksTomorrow] = useState<TaskCard[]>([]);
//   const [tasksUpcoming, setTasksUpcoming] = useState<TaskCard[]>([]);

//   useEffect(() => {
//     getTasksList();
//     getCategoryList();

//     const sortAndFilterTasks = () => {
//       const today = new Date().toLocaleDateString();
//       const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString();

//       console.log('today', today);
//       console.log('tomorrow', tomorrow);

//       const tasksToday = taskListDate.filter((task) => task.dueDate === today);
//       const tasksTomorrow = taskListDate.filter(
//         (task) => task.dueDate === tomorrow,
//       );
//       const tasksUpcoming = taskListDate.filter(
//         (task) => task.dueDate !== today && task.dueDate !== tomorrow,
//       );

//       setTasksToday(tasksToday);
//       setTasksTomorrow(tasksTomorrow);
//       setTasksUpcoming(tasksUpcoming);
//     };

//     sortAndFilterTasks();
//   }, [taskListDate, categoryListDate]);

//   return (
//     <div className='flex h-full '>
//       <SideBar />

//       <div className='flex max-w-[1500px] flex-col gap-x-4 p-4 md:flex-row md:justify-around lg:gap-x-3 xl:gap-x-7'>
//         <TaskList
//           day='Today'
//           date={formattedDateToday}
//           taskListDate={tasksToday}
//         />
//         <TaskList
//           day='Tomorrow'
//           date={formattedDateTomorrow}
//           taskListDate={tasksTomorrow}
//         />
//         <TaskList day='Upcoming' taskListDate={tasksUpcoming} />
//       </div>
//     </div>
//   );
// };
// export default MainPage;
