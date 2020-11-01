const boardsRepo = require('./board.DB.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const post = board => boardsRepo.post(board);
const put = (id, board) => boardsRepo.put(id, board);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, get, post, put, deleteBoard };
