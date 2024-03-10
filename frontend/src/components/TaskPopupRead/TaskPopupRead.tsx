import { FC } from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import styles from './TaskPopupRead.module.css';
import TaskCard from '../../models/TaskCard';

interface TaskPopupProps {
  zoomedTask: TaskCard | null;
  closeTaskPopup: () => void;
}

const TaskPopupRead: FC<TaskPopupProps> = ({ zoomedTask, closeTaskPopup }) => {
  const closePopup = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'container') closeTaskPopup();
  };

  return (
    <div id='container' className={styles.parent} onClick={closePopup}>
      <div className={styles.container}>
        <section className={styles.section_top}>
          <ul className={styles.icons_list}>
            <li>
              <IoMdCheckmarkCircleOutline className={styles.icon} />
            </li>
            <li>
              <AiOutlineDelete className={styles.icon} />
            </li>
            <li>
              <IoMdClose onClick={closeTaskPopup} className={styles.icon} />
            </li>
          </ul>
        </section>
        <div className={styles.priority}>
          <TbPointFilled className={styles.priority_point} />
          <p className={styles.priority_name}>High priority</p>
        </div>
        <h1 className={styles.title}>{zoomedTask?.title}</h1>
        <div className={styles.info}>
          <p className={styles.info_field}>Due date</p>
          <p className={styles.info_date}>Apr 21, 2025</p>
          <p className={styles.info_field}>{zoomedTask?.category}</p>
          <p className={styles.info_category}>Work</p>
          <p className={styles.info_field}>Status</p>
          <p className={styles.info_stutus}>To do</p>
        </div>
        <p className={styles.info_field}>Description</p>
        <p className={styles.description}>
          I need to develop my hard skills to get promotion.
        </p>
      </div>
    </div>
  );
};
export default TaskPopupRead;
