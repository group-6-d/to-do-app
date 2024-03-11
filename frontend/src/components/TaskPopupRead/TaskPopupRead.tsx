import { FC } from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import styles from './TaskPopupRead.module.css';
import TaskCard from '../../models/TaskCard';

interface TaskPopupProps {
  task: TaskCard | null;
  closeTaskPopup: () => void;
}

const TaskPopupRead: FC<TaskPopupProps> = ({ task, closeTaskPopup }) => {
  const closePopup = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
  };

  return (
    <div id='container' className={styles.parent} onClick={closePopup}>
      <div className={`${styles.container} dark:bg-stone-800`}>
        <section className={styles.section_top}>
          <ul className={styles.icons_list}>
            <li>
              <IoMdCheckmarkCircleOutline className={styles.icon} />
            </li>
            <li>
              <AiOutlineDelete className={styles.icon} />
            </li>
            <li>
              <AiOutlineEdit className={styles.icon} />
            </li>
            <li>
              <IoMdClose onClick={closeTaskPopup} className={styles.icon} />
            </li>
          </ul>
        </section>
        <div
          className={`${styles.priority} ${
            task?.priority === 'high priority'
              ? styles.priority_or
              : task?.priority === 'middle priority'
                ? styles.priority_ye
                : styles.priority_pu
          }`}
        >
          <TbPointFilled className={styles.priority_point} />
          <p className={styles.priority_name}>{task?.priority}</p>
        </div>
        <h1 className={styles.title}>{task?.title}</h1>
        <div className={styles.info}>
          <p className={styles.info_field}>Due date</p>
          <p className={styles.info_date}>{task?.dueDate}</p>
          <p className={styles.info_field}>Category</p>
          <p className={styles.info_category}>{task?.category}</p>
          <p className={styles.info_field}>Status</p>
          <p className={styles.info_stutus}>{task?.status}</p>
        </div>
        <p className={styles.info_field}>Description</p>
        <p className={styles.description}>{task?.description}</p>
      </div>
    </div>
  );
};
export default TaskPopupRead;
