import { useContext } from 'react';
import { SelectedPriorityContext } from '../../context/PriorityContext';

interface SideBarPriorityFilterItemProps {
  name: string;
  color: string;
}

const SideBarPriorityFilterItem = ({
  name,
  color,
}: SideBarPriorityFilterItemProps) => {
  const { selectedPriority, selectedPriorityHandler } = useContext(
    SelectedPriorityContext,
  );

  const handlePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      selectedPriorityHandler([...selectedPriority, name]);
    } else {
      selectedPriorityHandler(selectedPriority.filter((p) => p !== name));
    }
  };

  return (
    <li className='items-middle flex justify-between gap-2 rounded-xl p-2 hover:bg-stone-100 hover:dark:bg-stone-700'>
      <input
        type='checkbox'
        id={name}
        name={name}
        className={`checked:bg-${color} h-5 w-5 appearance-none rounded-full bg-white hover:cursor-pointer`}
        onChange={handlePriority}
      />
      <label
        htmlFor={name}
        className='m-0 text-sm  text-stone-900 hover:cursor-pointer dark:text-stone-100'
      >
        {name}
      </label>
    </li>
  );
};
export default SideBarPriorityFilterItem;
