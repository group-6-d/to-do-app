// import task model
import { Task } from '../models';
// import error
import { StatusCodes } from 'http-status-codes';

class TaskController {
  async createTask(req, res, next) {
    try {
      const {
        title,
        description,
        due_date,
        priority,
        status,
        // categoryId
      } = req.body;
      const task = await Task.create({
        title,
        description,
        due_date,
        priority,
        status,
        // categoryId
      });
      return res.json(task);
    } catch (e) {
      next(StatusCodes.BAD_REQUEST(e.message));
    }
  }

  async getAllTask(req, res) {
    const tasks = await Task.findAll();
    return res.json(tasks);
  }

  async getOneTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({
        where: { id },
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      return res.json(task);
    } catch (err) {
      next(StatusCodes.INTERNAL_SERVER_ERROR('Failed to fetch task.'));
    }
  }

  async editTask(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        due_date,
        priority,
        status,
        // categoryId
      } = req.body;
      const task = await Task.findOne({
        where: { id },
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      // update data
      task.title = title;
      task.description = description;
      task.due_date = due_date;
      task.priority = priority;
      task.status = status;
      //   task.categoryId = categoryId;

      // save updated task
      await task.save();
      return res.json(task);
    } catch (err) {
      next(ApiError.badRequest('Failed to edit task.'));
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({
        where: { id },
      });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await task.destroy();

      return res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      next(StatusCodes.BAD_REQUEST('Failed to delete task.'));
    }
  }
}

module.exports = new TaskController();
