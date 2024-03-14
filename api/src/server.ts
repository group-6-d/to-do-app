import dotenv from 'dotenv';
import { destroyDBConnections } from './client/db';
import express from './express';

dotenv.config();

const isValidEnvironment = () => {
  const {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_SCHEMA,
    JWT_SECRET_KEY,
    TOKEN_HEADER_KEY,
    JWT_EXPIRES_IN,
  } = process.env;
  if (
    !PORT ||
    !DB_HOST ||
    !DB_PORT ||
    !DB_NAME ||
    !DB_USERNAME ||
    !DB_PASSWORD ||
    !DB_SCHEMA ||
    !JWT_SECRET_KEY ||
    !TOKEN_HEADER_KEY ||
    !JWT_EXPIRES_IN
  ) {
    return false;
  }
};

const main = () => {
  const isValid = isValidEnvironment();
  if (isValid) {
    console.error(
      `This service will be terminated.
      Check the environment, some environment variables are missing.`,
    );
    process.exit(1);
  }

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
