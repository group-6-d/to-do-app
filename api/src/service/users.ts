import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { register as createUser, getUser } from '../db/user';

import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export type Login = {
  email: string;
  password: string;
};

export type Registration = Login & {
  firstName: string;
  lastName: string;
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

type LoginReturn = {
  code: StatusCodes;
  error?: string;
  token?: string;
};

export const login = async ({
  email,
  password,
}: Login): Promise<LoginReturn> => {
  const { result: user } = await getUser({ email });
  if (!user) {
    console.error(`[USER Service] User ${email} doesn't exit.`);
    return {
      code: StatusCodes.BAD_REQUEST,
      error: `User ${email} doesn't exit.`,
    };
  }

  const encryptedPassword = user.password;
  if (!encryptedPassword) {
    const error = `[USER Service] User ${email} has no encrypted password.`;
    console.error(error);
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      error: 'General error',
    };
  }

  const isEqual = await argon2.verify(encryptedPassword, password);
  if (!isEqual) {
    const error = `[USER Service] User ${email} password error.`;
    console.error(error);
    return {
      code: StatusCodes.BAD_REQUEST,
      error: 'Password wrong',
    };
  }

  const { id } = user;
  const payload = {
    id,
    email,
  };
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN as string;
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: jwtExpiresIn });

  return { code: StatusCodes.OK, token };
};

export const verifyAuthorization = (req: Request) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return {
      code: StatusCodes.BAD_REQUEST,
      error: 'No token founded',
    };
  }

  try {
    const [, token] = authorization.split(' ');
    console.log({ token });
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    const user = jwt.verify(token, jwtSecretKey) as JwtPayload;

    if (!user) {
      return {
        code: StatusCodes.FORBIDDEN,
        error: 'Authorization malformed',
      };
    }

    return {
      code: StatusCodes.OK,
      user,
    };
  } catch {
    console.error(
      `[USER Service] Access forbidden for authorization: ${authorization}`,
    );
    return {
      code: StatusCodes.FORBIDDEN,
      error: 'Access forbidden',
    };
  }
};
