import { Router } from 'express';
// imports routes
import taskRouter from './taskRouter';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';

const mainRouter = Router();

// since all other routers are sub-routes, you need to indicate this
mainRouter.use('/task', taskRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/categories', categoryRouter);

export default mainRouter;
