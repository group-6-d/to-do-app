import omit from 'lodash/fp/omit';
import { getDBPool } from '../client/db';

import type { Login, Registration } from '../service/users';
import type { GeneralReturn } from '../types';
import type { User } from '../schemas';

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: Registration): Promise<GeneralReturn<User>> => {
  try {
    const pool = await getDBPool();
    const creation = `INSERT INTO
        public.user (first_name, last_name, email, password)
      VALUES
        (
          '${firstName}',
          '${lastName}',
          '${email}',
          '${password}'
        )
      RETURNING *`;
    console.info(`[DB] USER CREATING: ${creation}`);
    const result = await pool.query<User>(creation);
    console.info(`[DB] USER CREATED: ${JSON.stringify(result)}`);

    const [user] = result.rows;
    return { result: omit(['password'])(user) };
  } catch (error) {
    console.error(`[DB] USER CREATION ERROR: ${error}`);
    return {};
  }
};

export const getUser = async ({
  email,
}: Partial<Login>): Promise<GeneralReturn<User>> => {
  try {
    const pool = await getDBPool();
    const sql = `SELECT *
    FROM
      public.user
    WHERE
      email='${email}'`;
    console.info(`[DB] USER GETTING: ${sql}`);
    const result = await pool.query<User>(sql);
    console.info(`[DB] USER GOT: ${JSON.stringify(result)}`);

    const [user] = result.rows;
    return { result: user };
  } catch (error) {
    console.error(`[DB] USER GETTING ERROR: ${error}`);
    return {};
  }
};
