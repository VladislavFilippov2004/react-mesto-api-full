const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users.js');

const {
  validateGetUsers,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateGetCurrentUser,
  validateGetUserById,
} = require('../middlewares/validations.js');

router.get('/', validateGetUsers, getUsers);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);
router.get('/users/me', validateGetCurrentUser, getCurrentUser);
router.get('/:userId', validateGetUserById, getUserById);

module.exports = router;
