const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => Board.find({});

const get = async id => Board.findById(id);

const post = async board => Board.create(board);

const put = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return get(id);
}

const deleteBoard = async id => {
  await Board.deleteOne({_id: id});
  await Task.deleteMany({ boardId: id });
  return true;
}

module.exports = { getAll, get, post, put, deleteBoard };
