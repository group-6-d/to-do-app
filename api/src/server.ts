import dotenv from 'dotenv';
import express from './express';
import { destroyDBConnections } from './client/db';
import { getSequelize, closeSequelize } from './orm';
import { initialModels, Task, User } from './models';

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

const main = async () => {
  dotenv.config();

  const error = `This service will be terminated.
  Check the environment, some environment variables are missing.`;
  const isValid = isValidEnvironment();
  if (isValid) {
    console.error(error);
    process.exit(1);
  }

  const sequelize = await getSequelize();
  if (!sequelize) {
    console.error(error);
    process.exit(1);
  }

  await initialModels(sequelize);

  // Test the models if you like

  // const allUsers = await User.findAll();
  // const allTasks = await Task.findAll();
  // console.log(allUsers);
  // console.log(allTasks);

  const port = process.env.PORT;

  express.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  const shutdown = async (signal: string) => {
    await destroyDBConnections();
    await closeSequelize();

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
