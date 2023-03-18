const express = require('express');
const { Joi } = require('express-validation');
const authCtrl = require('./auth.controller');
const { validate } = require('../../helpers');

const router = express.Router();

const paramValidation = {
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  registerUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    }),
  },
};

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  // .post(validate(paramValidation.login), authCtrl.login);
  .post(authCtrl.login);

/** POST /api/auth/register - Register a new user */
router.route('/register')
  // .post(validate(paramValidation.registerUser), authCtrl.register);
  .post(authCtrl.register);

router.route('/my-account')
  /** GET /api/users/profile - Get profile of logged in user */
  .get(authCtrl.getProfile);

module.exports = router;
