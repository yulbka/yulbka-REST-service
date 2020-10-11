const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const board = await boardsService.get(id);
  if (!board) {
    res.status(404).send('Board not found');
  } else {
    res.json(board);
  }
});

router.route('/').post(async (req, res) => {
  if (!Board.validate(req.body)) {
    return res.status(400).send('Bad request');
  }
  const board = await boardsService.post(req.body);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const board = req.body;
  await boardsService.put(id, board);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const isBoardDeleted = await boardsService.deleteBoard(id);
  if (isBoardDeleted) {
    res.status(204).send('The board has been deleted');
  } else {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
