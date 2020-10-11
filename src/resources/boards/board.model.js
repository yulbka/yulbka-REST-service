const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'board title',
    columns = [
      {
        id: uuid(),
        title: 'column title',
        order: 0
      }
    ]
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.columns = columns.map(column => {
      return {
        id: uuid(),
        ...column
      };
    });
  }

  static validate(board) {
    const { title, columns } = board;
    if (typeof title !== 'string' || title === '' || !Array.isArray(columns)) {
      return false;
    }
    columns.map(column => {
      if (
        Object.keys(column).length !== 2 ||
        !Object.keys(column).includes('title') ||
        !Object.keys(column).includes('order')
      ) {
        return false;
      }
      if (typeof column.title !== 'string' || column.title === '') {
        return false;
      }
      if (
        typeof column.order !== 'number' ||
        column.order < 0 ||
        isNaN(column.order) ||
        !Number.isInteger(column.order)
      ) {
        return false;
      }
    });
    return true;
  }
}

module.exports = Board;
