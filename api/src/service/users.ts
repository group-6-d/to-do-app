// Importing necessary modules and functions
import argon2 from 'argon2'; // For hashing and verifying passwords
import jwt from 'jsonwebtoken'; // To create and verify JWT tokens
import { StatusCodes } from 'http-status-codes'; // HTTP status codes for response consistency

// Importing database functions related to user operations
import {
  register as createUser,
  getUser,
  updateUser as updateDBUser,
} from '../db/user';

// Importing type definitions for Express requests and JWT payloads
import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

// Importing User schema for type consistency
import { User } from '../schemas';

// Type definitions for user-related operations
export type Login = {
  email: string;
  password: string;
};

export type Registration = Login & {
  firstName: string;
  lastName?: string;
};

export type UpdateUser = {
  id: number;
  firstName: string;
  email: string;
};

// Function to handle new user registration
export const register = async (registration: Registration) => {
  const { password } = registration;
  // Hashing the password using Argon2id algorithm with default options
  const encryptedPassword = await argon2.hash(password);
  const user = {
    ...registration,
    password: encryptedPassword, // Replacing plain password with hashed one
  };

  // Creating a new user in the database
  const result = await createUser(user);
  return result;
};

// Return type for login operation
type LoginReturn = {
  code: StatusCodes;
  error?: string;
  token?: string;
  user?: Partial<User>;
};

// Function to handle user login
export const login = async ({
  email,
  password,
}: Login): Promise<LoginReturn> => {
  // Retrieving user by email
  const { result: user } = await getUser({ email });
  if (!user) {
    // Handling case where user does not exist
    console.error(`[USER Service] User ${email} doesn't exit.`);
    return {
      code: StatusCodes.BAD_REQUEST,
      error: `User ${email} doesn't exit.`,
    };
  }

  // Verifying provided password against stored hash
  const encryptedPassword = user.password;
  if (!encryptedPassword) {
    // Handling missing password hash scenario
    const error = `[USER Service] User ${email} has no encrypted password.`;
    console.error(error);
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      error: 'General error',
    };
  }

  const isEqual = await argon2.verify(encryptedPassword, password);
  if (!isEqual) {
    // Password mismatch handling
    const error = `[USER Service] User ${email} password error.`;
    console.error(error);
    return {
      code: StatusCodes.BAD_REQUEST,
      error: 'Password wrong',
    };
  }

  // Creating JWT token for authenticated user
  const { id, first_name, last_name } = user;
  const payload = {
    id,
    email,
  };
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN as string;
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: jwtExpiresIn });

  // Returning success response with JWT token and user details
  return {
    code: StatusCodes.OK,
    token,
    user: {
      ...payload,
      first_name,
      last_name,
    },
  };
};

// Function to retrieve a user by email, simplifying user data retrieval
export const getUserByEmail = async (email: string) => {
  const { result: user } = await getUser({ email });
  if (!user) {
    // Handling non-existent user
    console.error(`[USER Service] User ${email} doesn't exit.`);
    return;
  }

  // Returning simplified user details
  const { id, first_name, last_name } = user;

  return {
    id,
    email,
    first_name,
    last_name,
  };
};

// Function to verify JWT token in authorization header
export const verifyAuthorization = (req: Request) => {
  const { authorization } = req.headers;
  if (!authorization) {
    // Missing authorization header handling
    return {
      code: StatusCodes.BAD_REQUEST,
      error: 'No token founded',
    };
  }

  try {
    // Extracting token from header and verifying it
    const [, token] = authorization.split(' ');
    console.log(`[USER Service] Verifying token: ${token}`);
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
  } catch (error) {
    console.error(
      `[USER Service] Access forbidden for authorization: ${authorization}`,
      error,
    );
    return {
      code: StatusCodes.FORBIDDEN,
      error: 'Access forbidden',
    };
  }
};

export const updateUser = async ({ id, firstName, email }: UpdateUser) => {
  const { result: user } = await updateDBUser({ id, firstName, email });

  if (!user) {
    return {
      code: StatusCodes.BAD_REQUEST,
      error: 'Check your payload',
    };
  }

  // Returning verified user details
  return { code: StatusCodes.OK, user };
};
