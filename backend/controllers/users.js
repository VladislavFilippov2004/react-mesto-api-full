const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const NotFoundError = require('../errors/not-found.js');
const BadRequestError = require('../errors/bad-request-error.js');
const ConflictError = require('../errors/conflict.js');
const UnauthorizedError = require('../errors/unauthorized.js');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  if (!password) {
    throw new BadRequestError('Пароль не может быть пустым');
  }
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email, password: hash,
    }).then((newUser) => res.send({ data: newUser.toJSON() }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        } else if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже есть в базе'));
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Не получилось сгенерировать токен'));
    });
};

const getCurrentUser = (req, res, next) => {
  const myId = req.user._id;
  User.findById((myId))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const data = { ...req.body };
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((link) => {
      if (!link) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }

      return res.send(link);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
