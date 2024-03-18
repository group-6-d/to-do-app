import { Sequelize } from 'sequelize';

let sequelizeInstance: Sequelize | null = null;

export const getSequelize = async () => {
  if (sequelizeInstance) return;

  const database = process.env.DB_NAME as string;
  const username = process.env.DB_USERNAME as string;
  const password = process.env.DB_PASSWORD as string;
  const host = process.env.DB_HOST as string;
  const port = Number(process.env.DB_PORT || 5432);
  const dialect = 'postgres';

  sequelizeInstance = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    pool: {
      max: 5,
    },
  });

  try {
    await sequelizeInstance.authenticate();
    console.log('[SEQUELIZE] Connection has been established successfully.');
    return sequelizeInstance;
  } catch (error) {
    console.error('[SEQUELIZE] Unable to connect to the database:', error);
    return;
  }
};

export const closeSequelize = async () => {
  console.info('[SEQUELIZE] releasing `sequelizeInstance`.');
  await sequelizeInstance?.close();
  console.info('[SEQUELIZE] `sequelizeInstance` has been released');
};
