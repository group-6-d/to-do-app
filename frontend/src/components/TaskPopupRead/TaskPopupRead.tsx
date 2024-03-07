import React from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbPointFilled } from 'react-icons/tb';
import styles from './TaskPopupRead.module.css';

const TaskPopupRead = () => {
  return (
    <div id='container' className={styles.parent}>
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
              <IoMdClose className={styles.icon} />
            </li>
          </ul>
        </section>
        <div className={styles.priority}>
          <TbPointFilled className={styles.priority_point} />
          <p className={styles.priority_name}>High priority</p>
        </div>
        <h1 className={styles.title}>My task is My task is My task is....</h1>
        <div className={styles.info}>
          <p className={styles.info_field}>Due date</p>
          <p className={styles.info_date}>Apr 21, 2025</p>
          <p className={styles.info_field}>Category</p>
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
