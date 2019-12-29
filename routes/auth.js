const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const { check, body } = require('express-validator');
const User = require('../models/user');
const isAuth = require('../middelware/is-auth');

// PUT /auth/signup
router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail already exists, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
      body('password').trim().isLength({min: 5}),
      body('name').trim().not().isEmpty()
],
authController.signup);

// POST /auth/login
router.post('/login', [
    body('email')
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
    body('password').trim().isLength({min: 5})
],
authController.login);

// GET /auth/status
router.get('/status', isAuth, authController.getUserStatus);

// PATCH /auth/status
router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.updateUserStatus
);


module.exports = router;