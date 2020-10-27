const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
  title: String,
  columns: [{
    title: String,
    order: Number,
  }]
},
{
  versionKey: false,
},
{
  collection: 'boards',
}
);

Board.statics.toResponse = (board) => {
  const { _id, title, columns } = board;
  return {
    id: _id,
    title,
    columns: columns.map(({ _id, title, order }) => ({ id: _id, title, order })),
  }
}

module.exports = mongoose.model('boards', Board);
