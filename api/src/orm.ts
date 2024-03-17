import { Sequelize } from 'sequelize';

// create a new Sequelize instance and export it
module.exports = new Sequelize(
  // pass database, username, password as separate arguments
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,

  // pass the rest of the configuration options as an object
  {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT || 5432),
  },
);