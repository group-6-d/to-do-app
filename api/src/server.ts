import dotenv from 'dotenv';
import { destroyDBConnections } from './client/db';
import app from './app';

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
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

export default app;
