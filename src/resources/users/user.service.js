const usersRepo = require('./user.DB.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const post = user => usersRepo.post(user);
const put = (id, user) => usersRepo.put(id, user);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, get, post, put, deleteUser };
