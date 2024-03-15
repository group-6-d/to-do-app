import express from 'express';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';

import { register, login, verifyAuthorization } from './service/users';

import type { Express, Request, Response, NextFunction } from 'express';
import type { TODORequest } from './types';

const preventUnAuthorizedAccess = (
  req: TODORequest,
  res: Response,
  next: NextFunction,
): void => {
  const whitelist = [
    {
      path: '/v1/users',
      method: 'POST',
    },
    {
      path: '/v1/users/login',
      method: 'POST',
    },
  ];

  const { path: reqPath, method: reqMethod } = req;
  const hit = whitelist.find(
    ({ path, method }) => path === reqPath && method === reqMethod,
  );

  if (hit) {
    next();
    return;
  }

  const { code, error, user } = verifyAuthorization(req);

  if (user) {
    req.user = user;
    next();
    return;
  }

  res.status(code).json({ error });
};

const bootstrap = () => {
  const app: Express = express();
  app.use(bodyParser.json());
  // app.use(preventUnAuthorizedAccess);

  app.post('/v1/users', async (req: Request, res: Response) => {
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
  });

  app.post('/v1/users/login', async (req: Request, res: Response) => {
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
  });

  app.get('/v1/users/token/verify', async (req: Request, res: Response) => {
    const { code, error, user } = verifyAuthorization(req);
    return res.status(code).json({ ...(user ? { user } : { error }) });
  });

  return app;
};

export default bootstrap();
