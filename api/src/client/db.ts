import { Pool, Client } from 'pg';

let pool: Pool | null = null;
let transactionClient: Client | null = null;

const getConnectionConfig = () => {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
  if (!DB_HOST)
    throw Error('Please set the `DB_HOST` as an environment variable');
  if (!DB_PORT)
    throw Error('Please set the `DB_PORT` as an environment variable');
  if (!DB_NAME)
    throw Error('Please set the `DB_NAME` as an environment variable');
  if (!DB_USERNAME)
    throw Error('Please set the `DB_USERNAME` as an environment variable');
  if (!DB_PASSWORD)
    throw Error('Please set the `DB_PASSWORD` as an environment variable');

  return {
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
  };
};

/**
 * Get a PostgreSQL connection `pool`, this pool manages the clients creation and idle automatically.
 * Please use this `getDBPool` for all of you `SELECT` query.
 *
 * In situation of using `transaction` please use `getTransactionClient` instead.
 *
 * Due to the pool will dispatch every query passed to `pool.query` on the first available idle client.
 *  Transactions within PostgreSQL are scoped to a single client and so dispatching individual queries within a single transaction across multiple,
 *  random clients will cause big problems in your app and not work.
 *  For more info please read transactions.
 *
 * DO NOT RELEASE the `pool` after your query, it'll be released before this service's `exit()`.
 *
 * {@link https://node-postgres.com/features/transactions Transactions}
 *
 * {@link https://node-postgres.com/apis/pool pg.Pool}
 * @returns {Pool}
 */
const getDBPool = () => {
  if (pool) return pool;

  try {
    const config = getConnectionConfig();
    pool = new Pool({
      ...config,
      max: 4,
    });
  } catch (error) {
    throw error;
  }

  return pool;
};

const destroyDBPool = async () => {
  console.info('[DB] releasing `pool`.');
  await pool?.end();
  console.info('[DB] `pool` has been released');
};

/**
 * All transactions should go through this `transactionClient`.
 * Check the comment on `getDBPool`
 *
 * DO NOT RELEASE the `transactionClient` after your query, it'll be released before this service's exit().
 *
 * {@link https://node-postgres.com/apis/client pg.Client}
 * @returns {Client}
 */
const getTransactionClient = async () => {
  if (transactionClient) return transactionClient;

  try {
    const config = getConnectionConfig();
    transactionClient = new Client(config);
    await transactionClient.connect();
  } catch (error) {
    throw error;
  }

  return transactionClient;
};

const destroyTransactionClient = async () => {
  console.info('[DB] releasing `transactionClient`.');
  await transactionClient?.end();
  console.info('[DB] `transactionClient` has been released');
};

const destroyDBConnections = async () => {
  await destroyTransactionClient();
  await destroyDBPool();
};

export { getDBPool, getTransactionClient, destroyDBConnections };
