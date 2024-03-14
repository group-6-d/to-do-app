import dotenv from 'dotenv';
import { destroyDBConnections } from './client/db';
import express from './express';

dotenv.config();

const main = () => {
  const port = process.env.PORT;

  express.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  const shutdown = async (signal: string) => {
    await destroyDBConnections();
    console.info(`[${signal}] This service is shutting down!`);
    process.exit(0);
  };

  process.on('SIGTERM', async () => {
    await shutdown('SIGTERM');
  });

  process.on('SIGINT', async () => {
    await shutdown('SIGINT');
  });
};

main();
