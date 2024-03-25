import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useUser from '../../providers/UserProvider/UserProvider.hook';
import LoginModel from '../../models/LoginModel';
import HeaderStart from '../../components/HeaderStart/HeaderStart';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: LoginModel) => {
    console.log(data);
    login(data);
  };

  return (
    <div className='mx-auto flex h-screen max-w-[1520px] flex-col p-6'>
      <HeaderStart />
      <div className='flex flex-col items-center py-16'>
        {/* <Logo /> */}
        <h2 className='text-xl md:mb-10 md:text-4xl'>Glad to see you!</h2>
        <form
          className='grid w-72 grid-cols-1 gap-4
        md:w-[436px] md:gap-6'
          onSubmit={handleSubmit(onSubmit)}
          name='loginForm'
          noValidate
        >
          <div className='relative flex flex-col items-start'>
            <label>email</label>
            <input
              className='input_auth_form'
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
            />
            {errors?.email && (
              <div className='md:text-md text-sm text-red-500'>
                {errors.email.message}
              </div>
            )}
          </div>

          <div className='relative flex flex-col items-start'>
            <label>password</label>
            <input
              className='input_auth_form'
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
            />
            {errors?.password && (
              <div className='md:text-md text-sm text-red-500'>
                {errors.password.message}
              </div>
            )}
          </div>
          <div className='mx-auto my-5'>
            <button
              disabled={!isValid}
              className='button_auth_form'
              aria-label='Send result'
            >
              Login
            </button>
          </div>
        </form>

        <div className='flex w-full items-center justify-center text-sm md:text-lg'>
          <p className='mr-3 text-stone-600'>Not registered yet?</p>
          <Link to='/register'>
            <span className='text-accent hover:text-accentDark cursor-pointer'>
              register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
