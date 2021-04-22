const express = require('express');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

// const path = require('path');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const router = require('./routes');
const auth = require('./middlewares/auth.js');
const {
  login,
  createUser,
} = require('./controllers/users.js');
const errorHandler = require('./middlewares/error-handler.js');
const {
  validateCreateUser,
  validateLogin,
} = require('./middlewares/validations.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('app start');
});
