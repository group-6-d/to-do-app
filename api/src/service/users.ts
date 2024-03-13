import argon2 from 'argon2';
import { register as createUser } from '../db/user';

export type Login = {
  email: string;
  password: string;
};

export type Registration = Login & {
  firstName: string;
  lastName: string;
};

export const login = ({ email, password }: Login) => {
  // await argon2.verify(await argon2.hash(password), password),
};

export const register = async (registration: Registration) => {
  const { password } = registration;
  const encryptedPassword = await argon2.hash(password);
  const user = {
    ...registration,
    password: encryptedPassword,
  };
  const result = await createUser(user);
  return result;
};
