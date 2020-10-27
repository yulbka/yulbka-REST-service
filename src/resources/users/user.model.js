const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  login: String,
  password: String,
},
{
  versionKey: false,
},
{
  collection: 'users',
});

User.statics.toResponse = (user) => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
}

module.exports = mongoose.model('users', User);
