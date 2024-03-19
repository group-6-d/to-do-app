const taskController = require('../controllers/taskController');
import { Router } from 'express';
const taskRouterObj = Router();

taskRouterObj.post('/', taskController.createTask);
taskRouterObj.get('/', taskController.getAllTask);
taskRouterObj.get('/:id', taskController.getOneTask);
taskRouterObj.patch('/:id', taskController.editTask);
taskRouterObj.delete('/:id', taskController.deleteTask);

export default taskRouterObj;
