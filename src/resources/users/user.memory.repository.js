const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => User.find({});

const get = async id => User.findById(id);

const post = async user => User.create(user);

const put = async (id, user) => {
  await User.updateOne({_id: id }, user);
  return get(id);
}

const deleteUser = async id => {
  await User.deleteOne({ _id: id });
  await Task.updateMany({ userId: id }, { userId: null });
  return true;
};

module.exports = { getAll, get, post, put, deleteUser };
