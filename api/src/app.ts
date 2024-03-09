import express from 'express';
import bodyParser from 'body-parser';

import type { Express, Request, Response } from 'express';

const port = process.env.PORT;
const app: Express = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'Express + TypeScript Server' });
});

export default app;
