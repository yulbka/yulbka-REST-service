const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => Task.find({ boardId, _id: taskId });

const post = async (boardId, task) => Task.create({ ...task, boardId  });

const put = async (boardId, taskId, task) => Task.updateOne({ boardId, _id: taskId }, task);

const deleteTask = async (boardId, taskId) => Task.deleteOne({ boardId, _id: taskId });

module.exports = { getAll, post, get, put, deleteTask };
