const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send();
    }
    await jwt.verify(token, JWT_SECRET_KEY);
    next();
  } catch (error) {
    return res.status(401).send();
  }  
}

module.exports = verifyAuth;