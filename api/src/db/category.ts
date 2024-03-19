import { getDBPool } from '../client/db';
import { Category } from '../schemas';

interface CategoryWithTaskTotal extends Category {
  total_tasks: number;
}

const SYSTEM_USER_ID = 1;

export const getAllCategoriesWithTaskAmountAttached = async (
  userId: number,
) => {
  try {
    const sql = `SELECT
      c.id,
      c.name,
      c.color,
      c.icon,
      CAST(COUNT(t.id) AS INTEGER) AS total_tasks
    FROM
      public.category AS c
    LEFT JOIN
      public.task AS t
    ON c.id = t.category_id AND t.user_id IN ($1, $2)
    WHERE
      c.user_id IN ($1, $2)
    GROUP BY
      c.id
    ORDER BY
      c.id;
  `;

    const pool = await getDBPool();
    console.info(`[DB] CATEGORY GETTING: ${sql}`);
    const result = await pool.query<CategoryWithTaskTotal>(sql, [
      SYSTEM_USER_ID,
      userId,
    ]);
    console.info(`[DB] CATEGORY GOT: ${JSON.stringify(result)}`);

    return result.rows;
  } catch (error) {
    console.error(`[DB] CATEGORY GOT ERROR: ${error}`);
    return;
  }
};
