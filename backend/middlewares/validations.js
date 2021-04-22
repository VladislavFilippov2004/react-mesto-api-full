const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email должно быть заполнено',
        'any.email': 'Введите email',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле password должно быть заполнено',
      }),
  }),
});
const validateGetUsers = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});
const validateUpdateProfile = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Введите имя',
        'any.required': 'Поле name должно быть заполнено',
        'string.min': 'Имя не может быть короче 2-ух символов',
        'string.max': 'Имя не может быть длинней 30-ти символов',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Введите имя',
        'string.min': 'Информация о вас не может быть короче 2-ух символов',
        'string.max': 'Информация о вас не может быть длинней 30-ти символов',
      }),
  }),
});
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email должно быть заполнено',
        'any.email': 'В этом поле необходимо ввести email',
      }),
    password: Joi.string().required().min(6)
      .messages({
        'any.required': 'Поле password должно быть заполнено',
        'string.min': 'Пароль не может быть короче 6-ти символов',
      }),
  }),
});
const validateUpdateAvatar = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL');
    }),
  }),
});
const validateGetCurrentUser = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});
const validateGetUserById = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(500).required(),
  }).unknown(),
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});
const validateGetCards = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
});
const validateCreateCard = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2)
      .messages({
        'any.required': 'Поле name должно быть заполнено',
        'string.min': 'Поле не може быть короче 2-ух символов',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL');
    }),
  }),
});
const validateDeleteCard = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});
const validatePutLike = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});
const validateDeleteLike = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});
module.exports = {
  validateLogin,
  validateGetUsers,
  validateUpdateProfile,
  validateCreateUser,
  validateUpdateAvatar,
  validateGetCurrentUser,
  validateGetUserById,
  validateGetCards,
  validateCreateCard,
  validateDeleteCard,
  validatePutLike,
  validateDeleteLike,
};
