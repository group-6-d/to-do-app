// @ts-nocheck

// import task model
import { Task } from '../models';
// import error
import { StatusCodes } from 'http-status-codes';

class TaskController {
  async createTask(req, res, next) {
    try {
      const { user } = req;

      const {
        user_id,
        title,
        description,
        due_date,
        priority,
        status,
        category_id,
      } = req.body.data;
      const task = await Task.create({
        user_id,
        title,
        description,
        due_date,
        priority,
        status,
        category_id,
      });
      return res.json(task);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json({ err });
    }
  }

  async getAllTask(req, res) {
    const { user } = req;
    const tasks = await Task.findAll({
      where: { user_id: user.id },
    });
    return res.json(tasks);
  }

  async editTask(req, res, next) {
    const { user } = req;
    try {
      const { id } = req.params;
      const { title, description, due_date, priority, status, category_id } =
        req.body.data;
      const task = await Task.findOne({
        where: { id, user_id: user.id },
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
      task.category_id = category_id;

      // save updated task
      await task.save();
      return res.json(task);
    } catch (err) {
      // next(ApiError.badRequest('Failed to edit task.'));
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json({ err });
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      const task = await Task.findOne({
        where: { id, user_id: user.id },
      });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await task.destroy();

      return res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      // next(StatusCodes.BAD_REQUEST);
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json({ err });
    }
  }
}

module.exports = new TaskController();
