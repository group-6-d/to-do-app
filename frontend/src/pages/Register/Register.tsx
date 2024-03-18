import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useUser from '../../providers/UserProvider/UserProvider.hook';
import RegisterModel from '../../models/RegisterModel';


type FormData = {
  name: string;
  lasName: string;
  email: string;
  password: string;
};

const Register = () => {
  const { registration } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterModel) => {
    console.log(data);
    registration(data);
  };

  return (
    <div className='flex flex-col  items-center py-16'>
      {/* <Logo /> */}
      <h2 className='text-xl md:mb-10 md:text-4xl'>Hi!</h2>
      <form
        className='grid w-72 grid-cols-1 gap-4 md:w-[436px] md:gap-6'
        onSubmit={handleSubmit(onSubmit)}
        name='registerForm'
        noValidate
      >
        <div className='relative flex flex-col items-start'>
          <label>first name</label>
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
            type='text'
          />

          <div className='md:text-md text-sm text-red-500'>
            {errors?.name && errors.name.message}
          </div>
        </div>

        <div className='relative flex flex-col items-start'>
          <label>last name</label>
          <input
            {...register('lastName', {
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
                message: 'Please enter a valid last name',
              },
            })}
            type='text'
          />

          <div className='md:text-md text-sm text-red-500'>
            {errors?.lastName && errors.lastName.message}
          </div>
        </div>

        <div className='relative flex flex-col items-start'>
          <label>email</label>
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
          />

          <div className='md:text-md text-sm text-red-500'>
            {errors?.email && errors.email.message}
          </div>
        </div>

        <div className='relative flex flex-col items-start'>
          <label>password</label>
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
          />

          <div className='md:text-md text-sm text-red-500'>
            {errors?.password && errors.password.message}
          </div>
        </div>

        <div className='mx-auto mb-5'>
          <button
            disabled={!isValid}
            // type='submit'
            className='md:text-xl'
            aria-label='Send result'
          >
            Register
          </button>
        </div>
      </form>

      <div className='flex w-full items-center justify-center text-sm md:text-lg'>
        <p className='mr-3 text-stone-600'>Already registered?</p>
        <Link to='/login'>
          <span className='text-accent hover:text-accentDark cursor-pointer'>
            login
          </span>
        </Link>
      </div>
    </div>
  );
};
export default Register;
