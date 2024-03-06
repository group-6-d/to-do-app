const MainSection = () => {
  return (
    <main className='flex h-full bg-slate-200'>
      <aside className='border-2 border-gray-300'>
        <button className='mb-4 bg-indigo-700 px-8 py-4 text-white'>
          New Task
        </button>
        <ul className='pl-5'>
          <li className='py-2 hover:cursor-pointer hover:underline'>
            Personal
          </li>
          <li className='py-2 hover:cursor-pointer hover:underline'>Work</li>
          <li className='py-2 hover:cursor-pointer hover:underline'>
            Shopping
          </li>
          <li className='py-2 hover:cursor-pointer hover:underline'>Hobbies</li>
          <li className='py-2 hover:cursor-pointer hover:underline'>Movies</li>
        </ul>
      </aside>
      <div></div>
    </main>
  );
};
export default MainSection;
