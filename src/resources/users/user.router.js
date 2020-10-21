const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    const validationFailedFields = [name, login, password].filter(
      param => typeof param !== 'string' || param === ''
    );
    if (validationFailedFields.length) {
      return res.status(400).send('Bad request');
    }
    const user = await usersService.post(req.body);
    res.json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await usersService.get(id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(User.toResponse(user));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await usersService.put(id, req.body);
    res.json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const isUserDeleted = await usersService.deleteUser(id);
    if (isUserDeleted) {
      res.status(204).send('The user has been deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
