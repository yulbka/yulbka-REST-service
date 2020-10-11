const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const post = (boardId, task) => tasksRepo.post(boardId, task);
const put = (boardId, taskId, task) => tasksRepo.put(boardId, taskId, task);
const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = { getAll, get, post, put, deleteTask };
