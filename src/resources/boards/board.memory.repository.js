const database = require('../../common/database');
const Board = require('./board.model');

const getAll = async () => {
  return database.boards;
};

const get = async id => {
  if (!database.boards.filter(board => board.id === id).length) {
    return false;
  }
  return database.boards.filter(board => board.id === id)[0];
};

const post = async board => {
  const newBoard = new Board(board);
  database.boards.push(newBoard);
  database.tasks[newBoard.id] = [];
  return newBoard;
};

const put = async (id, board) => {
  const updatedBoard = board;
  database.boards = [
    ...database.boards.filter(board => board.id !== id),
    updatedBoard
  ];
};

const deleteBoard = async id => {
  if (!database.boards.filter(board => board.id === id).length) {
    return false;
  }
  database.boards = database.boards.filter(board => board.id !== id);
  database.tasks[id] = [];
  return true;
};

module.exports = { getAll, get, post, put, deleteBoard };
