import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  register,
  login,
  verifyAuthorization,
  getUserByEmail,
  updateUser,
} from '../service/users';

class UserController {
  async register(req: Request, res: Response) {
    console.info(
      `[users service] incoming registration: ${JSON.stringify(req.body)}`,
    );

    const { firstName, email, password } = req.body;
    if (!firstName) {
      const error = 'Missing `firstName`';
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    if (!email) {
      const error = 'Missing `email`';
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    if (!password) {
      const error = 'Missing `password`';
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    if (password.length < 8) {
      const error = 'Password length at least 8';
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    const { result } = await register(req.body);
    if (!result) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
    return res.status(StatusCodes.CREATED).json(result);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email) {
      const error = 'Missing `email`';
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    if (!password) {
      const error = 'Missing `password`';
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    const { code, error, token, user } = await login(req.body);
    return res.status(code).json({ ...(token ? { token, user } : { error }) });
  }

  async verifyToken(req: Request, res: Response) {
    console.log(`[User Controller] Got user: ${JSON.stringify(req.user)}`);
    const { code, error, user } = verifyAuthorization(req);
    const email = user?.email;
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Check your request' });
    }
    const userInDb = await getUserByEmail(email);
    if (!userInDb) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
    return res
      .status(code)
      .json({ ...(user ? { user: { ...userInDb, ...user } } : { error }) });
  }

  async patchUser(req: Request, res: Response) {
    const { user } = req;
    if (!user || user.id === undefined) {
      const error = `Weird! How did you even make it to reach here? Let's kill an engineer and cover this issue!`;
      console.error(`[User Controller] ${error} with headers: ${req.headers}`);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    const { id } = user;
    const { email, firstName } = req.body;
    if (!email && !firstName) {
      const error = 'What are you trying to update?';
      console.error(`[User Controller] ${error}`);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    const {
      error,
      code,
      user: updatedUser,
    } = await updateUser({ id, email, firstName });
    return res
      .status(code)
      .json({ ...(updatedUser ? { user: updatedUser } : { error }) });
  }
}

export default new UserController();
