const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards.js');
const {
  validateGetCards, validateCreateCard, validateDeleteCard, validatePutLike, validateDeleteLike,
} = require('../middlewares/validations.js');

router.get('/', validateGetCards, getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateDeleteCard, deleteCard);
router.put('/:cardId/likes', validatePutLike, putLike);
router.delete('/:cardId/likes', validateDeleteLike, deleteLike);

module.exports = router;
