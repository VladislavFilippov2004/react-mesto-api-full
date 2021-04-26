const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized.js');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация (auth)');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    console.log('err, auth', err);
    next(err);
  }
  req.user = payload;
  next();
};
module.exports = auth;
