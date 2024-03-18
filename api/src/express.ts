import express from 'express';
import cors from 'cors';

import router from './routes';
import { verifyAuthorization } from './service/users';

import type { Express, Request, Response, NextFunction } from 'express';

const preventUnAuthorizedAccess = (
  req: Request,
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
    {
      path: '/v1/users/token/verify',
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
  app.use(cors());
  app.use(express.json());
  app.use(preventUnAuthorizedAccess);

  app.use('/v1', router);

  return app;
};

export default bootstrap();
