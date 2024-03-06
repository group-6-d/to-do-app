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
  { title: 'Practice guitar for 30 minutes', category: 'hobbies', id: 4 },
  { title: 'Watch "The Godfather"', category: 'movies', id: 5 },
  { title: 'Call mom', category: 'personal', id: 6 },
  { title: 'Send follow-up emails', category: 'work', id: 7 },
  { title: 'Purchase birthday gift for friend', category: 'shopping', id: 8 },
  { title: 'Paint a picture', category: 'hobbies', id: 9 },
  { title: 'Watch "Inception"', category: 'movies', id: 10 },
  { title: 'Schedule dentist appointment', category: 'personal', id: 11 },
  { title: 'Prepare presentation slides', category: 'work', id: 12 },
  { title: 'Buy new running shoes', category: 'shopping', id: 13 },
  { title: 'Read a book for an hour', category: 'hobbies', id: 14 },
  { title: 'Watch "The Shawshank Redemption"', category: 'movies', id: 15 },
  { title: 'Clean out closet', category: 'personal', id: 16 },
  { title: 'Attend team meeting', category: 'work', id: 17 },
  { title: 'Grocery shopping for the week', category: 'shopping', id: 18 },
  { title: 'Practice photography skills', category: 'hobbies', id: 19 },
  { title: 'Watch "Pulp Fiction"', category: 'movies', id: 20 },
];

const TaskList = () => {
  return (
    <ul className=''>
      <div className='relative mb-[2rem] w-full border-x-2 border-stone-300'>
        <h4 className='fixed w-full bg-indigo-100 p-2'>Wed: March, 6</h4>
      </div>

      {data.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
export default TaskList;
