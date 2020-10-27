const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const task = await tasksService.get(boardId, taskId);
    if (!task[0]) {
      res.status(404).send('Task not found');
    } else {
      res.json(Task.toResponse(task[0]));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const task = await tasksService.post(boardId, req.body);
    res.json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const task = req.body;
    await tasksService.put(boardId, taskId, task);
    res.json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const isTaskDeleted = await tasksService.deleteTask(boardId, taskId);
    if (isTaskDeleted) {
      res.status(204).send('The task has been deleted');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
