import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import styles from '../../components/Authentication/Authentication.module.css';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
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
      <h2 className={styles.title}>Glad to see you!</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        name='loginForm'
        noValidate
      >
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
            type='text'
            className={styles.input}
          />
          {errors?.email && (
            <div className={styles.error_message}>{errors.email.message}</div>
          )}
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>password</label>
          <input
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required!',
              },
              minLength: {
                value: 8,
                message: 'Minimum length is 8',
              },
              maxLength: {
                value: 40,
                message: 'Maximum length is 200',
              },
            })}
            type='password'
            className={styles.input}
          />
          {errors?.password && (
            <div className={styles.error_message}>
              {errors.password.message}
            </div>
          )}
        </div>
        <div className='mx-auto mb-5'>
          <button
            disabled={!isValid}
            // type='submit'
            className={`${styles.button_form} md:p-4 md:text-lg`}
            aria-label='Send result'
          >
            Sign up
          </button>
        </div>
      </form>

      <div className={styles.link_container}>
        <p className={styles.link_question}>Not registered yet?</p>
        {/* <Link to="/signup"> */}
        <span className={styles.link_item}>Sign up</span>
        {/* </Link> */}
      </div>
    </div>
  );
};
export default Login;
