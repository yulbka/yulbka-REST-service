const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'task title',
    order = 0,
    description = 'task description',
    userId = 'user id',
    boardId = 'board id',
    columnId = 'column id'
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
