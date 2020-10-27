const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema({
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String,
},
{
  versionKey: false,
},
{
  collection: 'tasks',
});

Task.statics.toResponse = (task) => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return { id: _id, title, order, description, userId, boardId, columnId };
}

module.exports = mongoose.model('tasks', Task);
