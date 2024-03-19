import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAllCategoriesWithTaskAmountAttached } from '../db/category';

const getAllCategories = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user || user.id === undefined) {
    const error = `Weird! How did you even make it to reach here? Let's kill an engineer and cover this issue!`;
    console.error(
      `[Category Controller] ${error} with headers: ${req.headers}`,
    );
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }

  const categories = await getAllCategoriesWithTaskAmountAttached(user.id);
  if (!categories) {
    console.error(`[Category Controller] Dude! Check the DB Error`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
  return res.json(categories);
};

export default { getAllCategories };
