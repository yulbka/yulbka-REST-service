const database = require('../../common/database');
const Task = require('./task.model');

const getAll = async boardId => {
  return database.tasks[boardId];
};

const get = async (boardId, taskId) => {
  if (!database.tasks[boardId].filter(task => task.id === taskId).length) {
    return false;
  }
  return database.tasks[boardId].filter(task => task.id === taskId)[0];
};

const post = async (boardId, task) => {
  const newTask = {
    ...new Task(task),
    boardId
  };
  database.tasks[boardId].push(newTask);
  return newTask;
};

const put = async (boardId, taskId, task) => {
  const updatedTask = task;
  database.tasks[boardId] = [
    ...database.tasks[boardId].filter(task => task.id !== taskId),
    updatedTask
  ];
};

const deleteTask = async (boardId, taskId) => {
  if (!database.tasks[boardId].filter(task => task.id === taskId).length) {
    return false;
  }
  database.tasks[boardId] = database.tasks[boardId].filter(
    task => task.id !== taskId
  );
  return true;
};

module.exports = { getAll, post, get, put, deleteTask };
