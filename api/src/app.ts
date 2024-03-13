import express from 'express';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';

import type { Express, Request, Response } from 'express';
import { register } from './service/users';

const app: Express = express();
app.use(bodyParser.json());

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

  const user = { firstName, lastName, email, password };
  const { result } = await register(user);
  if (!result) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
  return res.status(StatusCodes.CREATED).json(result);
});

export default app;
