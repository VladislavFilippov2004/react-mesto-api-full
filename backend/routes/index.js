const router = require('express').Router();
const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const NotFoundError = require('../errors/not-found.js');

router.use('/api/users', usersRouter);
router.use('/api/cards', cardsRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден (frontedn/routes/index.js'));
});

module.exports = router;
