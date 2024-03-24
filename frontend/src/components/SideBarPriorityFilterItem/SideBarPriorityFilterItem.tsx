interface SideBarPriorityFilterItemProps {
  name: string;
  color: string;
}

const SideBarPriorityFilterItem = ({
  name,
  color,
}: SideBarPriorityFilterItemProps) => {
  // const { selectedPriority, selectedPriorityHandler } = useContext(
  //   SelectedCategoriesContext,
  // );

  // const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = e.target.checked;
  //   const categoryId = category.id;

  //   if (isChecked) {
  //     selectedPriorityHandler([...selectedPriority, category]);
  //   } else {
  //     selectedPriorityHandler(
  //       selectedPriority.filter((cat) => cat.id !== categoryId),
  //     );
  //   }
  // };

  return (
    <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
      <input
        type='checkbox'
        id='high'
        name='high'
        className={`checked:bg-${color} h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer`}
      />
      <label
        htmlFor='high'
        className='m-0 text-sm  text-stone-900 hover:cursor-pointer dark:text-stone-100'
      >
        {name}
      </label>
    </li>
  );
};
export default SideBarPriorityFilterItem;
