const database = require('../../common/database');
const User = require('./user.model');

const getAll = async () => {
  return database.users;
};

const get = async id => {
  if (!database.users.filter(user => user.id === id).length) {
    return false;
  }
  return database.users.filter(user => user.id === id)[0];
};

const post = async user => {
  const newUser = new User(user);
  database.users.push(newUser);
  return newUser;
};

const put = async (id, user) => {
  database.users = [...database.users.filter(user => user.id !== id), user];
  return user;
};

const deleteUser = async id => {
  if (!database.users.filter(user => user.id === id).length) {
    return false;
  }
  database.users = database.users.filter(user => user.id !== id);
  Object.values(database.tasks);
  for (const [board, tasks] of Object.entries(database.tasks)) {
    tasks.map(task => {
      if (task.userId === id) {
        task.userId = null;
      }
    });
  }
  return true;
};

module.exports = { getAll, get, post, put, deleteUser };
