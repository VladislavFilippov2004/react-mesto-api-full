const Card = require('../models/card.js');
const NotFoundError = require('../errors/not-found.js');
const BadRequestError = require('../errors/bad-request-error.js');
const Forbidden = require('../errors/forbidden.js');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const cardData = { owner: req.user._id, ...req.body };
  Card.create(cardData)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(card)
          .then(() => {
            res.status(200).send({ message: 'Карточка успешно удалена' });
          });
      } else {
        throw new Forbidden('Нельзя удалять чужие карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (like === null) {
        throw new NotFoundError('Карточки с переданным id нет в базе');
      }
      return res.send(like);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (like === null) {
        throw new NotFoundError('Карточки с переданным id нет в базе');
      }
      return res.send(like);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
