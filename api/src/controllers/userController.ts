import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { register, login, verifyAuthorization } from '../service/users';

class UserController {
  async register(req: Request, res: Response) {
    console.info(
      `[users service] incoming registration: ${JSON.stringify(req.body)}`,
    );

    const { firstName, lastName, email, password } = req.body;
    if (!firstName) {
      const error = 'Missing `firstName`';
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
    if (!lastName) {
      const error = 'Missing `lastName`';
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

    const { code, error, token } = await login(req.body);
    return res.status(code).json({ ...(token ? { token } : { error }) });
  }

  async verifyToken(req: Request, res: Response) {
    const { code, error, user } = verifyAuthorization(req);
    return res.status(code).json({ ...(user ? { user } : { error }) });
  }
}

export default new UserController();
