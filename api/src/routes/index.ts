const Router = require('express');
const mainRouter = new Router();

// imports routes
const taskRouter = require('./taskRouter')
// const userRouter = require('./userRouter')

// since all other routers are subroots, you need to indicate this
mainRouter.use('/task', taskRouter);
// router.use('/user', userRouter);


module.exports = mainRouter;