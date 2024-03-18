import { Router } from 'express';
// imports routes
import taskRouter from './taskRouter';
import userRouter from './userRouter';

const mainRouter = Router();

// since all other routers are sub-routes, you need to indicate this
mainRouter.use('/task', taskRouter);
mainRouter.use('/users', userRouter);

export default mainRouter;
