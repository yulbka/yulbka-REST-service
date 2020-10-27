const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const board = await boardsService.get(id);
    if (!board) {
      res.status(404).send('Board not found');
    } else {
      res.json(Board.toResponse(board));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.post(req.body);
    if (!board) {
      res.status(404).send('Board not found');
    } else {
      res.json(Board.toResponse(board));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const newBoard = req.body;
    newBoard.columns = newBoard.columns.map(({ id, title, order }) => ({ _id: id, title, order }));
    const board = await boardsService.put(id, newBoard);
    if (!board) {
      res.status(404).send('Board not found');
    } else {
      res.json(Board.toResponse(board));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const isBoardDeleted = await boardsService.deleteBoard(id);
    if (isBoardDeleted) {
      res.status(204).send('The board has been deleted');
    } else {
      res.status(404).send('Board not found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
