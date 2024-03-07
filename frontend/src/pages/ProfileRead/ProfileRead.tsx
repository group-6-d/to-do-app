import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileRead.module.css';

const ProfileRead = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hi, Kseniia!</h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <p className={styles.field_name}>name</p>
          <p className={styles.field_content}>Kseniia</p>
        </div>
        <div className={styles.field}>
          <p className={styles.field_name}>email</p>
          <p className={styles.field_content}>email@email.com</p>
        </div>
      </div>
      <div className={styles.link_edit}>
        <Link to='/profile/edit'>Edit</Link>
      </div>
    </div>
  );
};
export default ProfileRead;
