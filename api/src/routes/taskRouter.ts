const Router = require('express');
const taskRouterObj = new Router();
const taskController = require('../controllers/taskController');

taskRouterObj.post('/', taskController.createTask);
taskRouterObj.get('/', taskController.getAllTask);
taskRouterObj.get('/:id', taskController.getOneTask);
taskRouterObj.patch('/:id', taskController.editTask);
taskRouterObj.delete('/:id', taskController.deleteTask);

export default taskRouterObj;
