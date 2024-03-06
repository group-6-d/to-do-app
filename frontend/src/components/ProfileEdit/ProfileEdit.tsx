import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import styles from './ProfileEdit.module.css';

type FormData = {
  name: string;
  email: string;
};

const ProfileEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      {/* <Logo /> */}
      <h2 className={styles.title}>Profile Editing</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} name="profileForm" noValidate>
        
        <div className={styles.input_container}>
        <label className={styles.input_label}>name</label>
          <input
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required!',
              },
              minLength: {
                value: 3,
                message: 'Minimum length is 3',
              },
              maxLength: {
                value: 40,
                message: 'Maximum length is 40',
              },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
                message: 'Please enter a valid name',
              },
            })}
            type="text"
            className={styles.input}
          />
          {errors?.name && <div className={styles.error_message}>{errors.name.message}</div>}
        </div>
        
        <div className={styles.input_container}>
        <label className={styles.input_label}>email</label>
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required!',
              },
              minLength: {
                value: 3,
                message: 'Minimum length is 3',
              },
              maxLength: {
                value: 40,
                message: 'Maximum length is 40',
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Please enter a valid email',
              },
            })}
            type="text"
            className={styles.input}
          />
          {errors?.email && <div className={styles.error_message}>{errors.email.message}</div>}
        </div>
        <div className="authentication__button-container authentication__button-container_further">
          <button disabled={!isValid} type="submit" className={styles.button} aria-label="Save result">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
