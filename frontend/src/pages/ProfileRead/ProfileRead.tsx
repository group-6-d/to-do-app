import { Link } from 'react-router-dom';
import styles from './ProfileRead.module.css';
import useUser from '../../providers/UserProvider/UserProvider.hook';

const ProfileRead = () => {
  const { signout, currentUser } = useUser();
  const handleLogout = () => {
    signout();
  };
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hi, {currentUser?.name}!</h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <p className={styles.field_name}>name</p>
          <p className={styles.field_content}>{currentUser?.name}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.field_name}>email</p>
          <p className={styles.field_content}>{currentUser?.email}</p>
        </div>
      </div>
      <div className={styles.link_edit}>
        <Link to='/profile/edit'>Edit</Link>
      </div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
export default ProfileRead;
