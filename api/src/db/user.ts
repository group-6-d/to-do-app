import omit from 'lodash/fp/omit';
import { getDBPool } from '../client/db';

import type { Login, Registration, UpdateUser } from '../service/users';
import type { GeneralReturn } from '../types';
import type { User } from '../schemas';

export const register = async ({
  firstName,
  lastName = '',
  email,
  password,
}: Registration): Promise<GeneralReturn<User>> => {
  try {
    const pool = await getDBPool();
    const sql = `INSERT INTO
        public.user (first_name, last_name, email, password)
      VALUES
        ($1, $2, $3, $4)
      RETURNING *`;
    console.info(`[DB] USER CREATING: ${sql}`);
    const result = await pool.query<User>(sql, [
      firstName,
      lastName,
      email,
      password,
    ]);
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
      email=$1`;
    console.info(`[DB] USER GETTING: ${sql}`);
    const result = await pool.query<User>(sql, [email]);
    console.info(`[DB] USER GOT: ${JSON.stringify(result)}`);

    const [user] = result.rows;
    return { result: user };
  } catch (error) {
    console.error(`[DB] USER GOT ERROR: ${error}`);
    return {};
  }
};

export const updateUser = async ({ id, firstName, email }: UpdateUser) => {
  try {
    const updateFields = [];
    const params: (string | number)[] = [id];
    let counter = 2;
    if (firstName) {
      updateFields.push(`first_name=$${counter}`);
      params.push(firstName);
      counter++;
    }
    if (email) {
      updateFields.push(`email=$${counter}`);
      params.push(email);
      counter++;
    }

    if (updateFields.length === 0) {
      // Suppose not step in here, but for defending.
      console.error('[DB] UPDATE USER: No fields provided for update');
      return {};
    }
    const pool = await getDBPool();
    const sql = `UPDATE
      public.user
    SET
      ${updateFields.join(', ')}
    WHERE
      id=$1
    RETURNING *`;
    console.info(`[DB] USER CREATING: ${sql}`);
    const result = await pool.query<User>(sql, params);
    console.info(`[DB] USER CREATED: ${JSON.stringify(result)}`);

    const [user] = result.rows;
    return { result: omit(['password'])(user) };
  } catch (error) {
    console.error(`[DB] USER CREATION ERROR: ${error}`);
    return {};
  }
};
