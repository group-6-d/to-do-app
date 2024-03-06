type dataType = {
  title: string;
  category: 'Personal' | 'Work' | 'Shopping' | 'Hobbies' | 'Movies';
  id: number;
};
const data: dataType[] = [
  { title: 'Go for a run', category: 'Personal', id: 1 },
  { title: 'Finish report for meeting', category: 'Work', id: 2 },
  { title: 'Buy groceries', category: 'Shopping', id: 3 },
  { title: 'Practice guitar for 30 minutes', category: 'Hobbies', id: 4 },
  { title: 'Watch "The Godfather"', category: 'Movies', id: 5 },
  { title: 'Call mom', category: 'Personal', id: 6 },
  { title: 'Send follow-up emails', category: 'Work', id: 7 },
  { title: 'Purchase birthday gift for friend', category: 'Shopping', id: 8 },
  { title: 'Paint a picture', category: 'Hobbies', id: 9 },
  { title: 'Watch "Inception"', category: 'Movies', id: 10 },
  { title: 'Schedule dentist appointment', category: 'Personal', id: 11 },
  { title: 'Prepare presentation slides', category: 'Work', id: 12 },
  { title: 'Buy new running shoes', category: 'Shopping', id: 13 },
  { title: 'Read a book for an hour', category: 'Hobbies', id: 14 },
  { title: 'Watch "The Shawshank Redemption"', category: 'Movies', id: 15 },
  { title: 'Clean out closet', category: 'Personal', id: 16 },
  { title: 'Attend team meeting', category: 'Work', id: 17 },
  { title: 'Grocery shopping for the week', category: 'Shopping', id: 18 },
  { title: 'Practice photography skills', category: 'Hobbies', id: 19 },
  { title: 'Watch "Pulp Fiction"', category: 'Movies', id: 20 },
];

const TaskList = () => {
  return (
    <ul className=''>
      <div className=' w-full border-2 border-stone-300 bg-indigo-100 px-1 py-2'>
        <h4 className='mx-auto'>Wed: The 6th of March</h4>
      </div>

      {data.map((task) => (
        <li className='mb-2 flex min-h-[100px] flex-col justify-between bg-stone-50 p-2'>
          <h3>{task.title}</h3>

          <div className='flex justify-between'>
            <div className='rounded-lg border-2 border-stone-300 px-2'>
              {task.category}
            </div>
            <button className='border-2 border-gray-400 px-2'>Change</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default TaskList;
