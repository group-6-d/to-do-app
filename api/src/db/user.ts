import omit from 'lodash/fp/omit';
import { getDBPool } from '../client/db';

import type { Registration } from '../service/users';
import type { GeneralReturn } from '../types';
import type { User } from '../schemas';

export const register = async (
  registration: Registration,
): Promise<GeneralReturn<User>> => {
  try {
    const { firstName, lastName, email, password } = registration;
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
