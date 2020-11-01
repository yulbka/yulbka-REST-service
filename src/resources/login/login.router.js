const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../users/user.model');
const crypt = require('../../common/crypt');

router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = (await User.find({ login }))[0];
    if (!login || !password || !user) {
      return res.status(401).send('Not authorized');
    }
    const passwordChecked = await crypt.checkCrypt(password, user.password);
    if (!passwordChecked) {
      return res.status(403).send();
    }
    const token = await jwt.sign({ login, id: user._id }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;