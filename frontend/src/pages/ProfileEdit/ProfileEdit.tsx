import { useForm, FieldValues } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import useUser from '../../providers/UserProvider/UserProvider.hook';

type FormData = {
  name: string;
  email: string;
};

const ProfileEdit = () => {
  const { currentUser } = useUser();

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
    <div className='flex flex-col items-center py-16'>
      {/* <Logo /> */}
      <h2 className='text-xl md:mb-10 md:text-4xl'>Profile Editing</h2>
      <form
        className='grid w-72 grid-cols-1 gap-4 md:w-[436px] md:gap-6'
        onSubmit={handleSubmit(onSubmit)}
        name='profileForm'
        noValidate
      >
        <div className='relative flex flex-col items-start'>
          <label>name</label>
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
            defaultValue={currentUser?.name}
            type='text'
            className='input_auth_form'
          />
          {errors?.name && (
            <div className='md:text-md text-sm text-red-500'>{errors.name.message}</div>
          )}
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
            defaultValue={currentUser?.email}
            type='text'
            className='input_auth_form'
          />
          {errors?.email && (
            <div className='md:text-md text-sm text-red-500'>{errors.email.message}</div>
          )}
        </div>
        <div className='mx-auto my-10'>
          <button
            disabled={!isValid}
            className='button_auth_form'
            aria-label='Save result'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
