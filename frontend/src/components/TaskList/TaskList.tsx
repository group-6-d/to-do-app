import { useState } from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';

export type dataType = {
  title: string;
  category: 'personal' | 'work' | 'shopping' | 'hobbies' | 'movies';
  id: number;
};

const data: dataType[] = [
  { title: 'Go for a run', category: 'personal', id: 1 },
  { title: 'Finish report for meeting', category: 'work', id: 2 },
  { title: 'Buy groceries', category: 'shopping', id: 3 },
  // { title: 'Practice guitar for 30 minutes', category: 'hobbies', id: 4 },
  // { title: 'Watch "The Godfather"', category: 'movies', id: 5 },
  // { title: 'Call mom', category: 'personal', id: 6 },
  // { title: 'Send follow-up emails', category: 'work', id: 7 },
  // { title: 'Purchase birthday gift for friend', category: 'shopping', id: 8 },
  // { title: 'Paint a picture', category: 'hobbies', id: 9 },
  // { title: 'Watch "Inception"', category: 'movies', id: 10 },
  // { title: 'Schedule dentist appointment', category: 'personal', id: 11 },
  // { title: 'Prepare presentation slides', category: 'work', id: 12 },
  // { title: 'Buy new running shoes', category: 'shopping', id: 13 },
  { title: 'Read a book for an hour', category: 'hobbies', id: 14 },
  { title: 'Watch "The Shawshank Redemption"', category: 'movies', id: 15 },
  { title: 'Clean out closet', category: 'personal', id: 16 },
  { title: 'Attend team meeting', category: 'work', id: 17 },
  { title: 'Grocery shopping for the week', category: 'shopping', id: 18 },
  { title: 'Practice photography skills', category: 'hobbies', id: 19 },
  { title: 'Watch "Pulp Fiction"', category: 'movies', id: 20 },
];

type TaskListProps = string;

const TaskList = ({ day }: TaskListProps) => {
  return (

    <ul className='md:overflow-hidden'>
      <h4 className='rounded-t-2xl bg-white p-4 font-semibold '>{day}</h4>

      <div className='h-full md:overflow-scroll'>
        <div className='mb-6 rounded-b-2xl bg-white pb-2 shadow-xl md:mb-[5rem] '>
          {data.map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </ul>

  );
};
export default TaskList;
