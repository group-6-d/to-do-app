import dotenv from 'dotenv';
import express from 'express'
import bodyParser from 'body-parser';

import type { Express, Request, Response } from "express";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.json({"hello": 'Express + TypeScript Server'});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
