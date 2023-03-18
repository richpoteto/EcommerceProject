const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../user/user.model');
const APIError = require('../../helpers/APIError');
const config = require('../../config');

/**
 * Returns jwt token and user details if valid email and password are provided
 * @property {string} req.query.email - The email of user.
 * @property {string} req.query.password - The password of user.
 * @returns {token, User}
 */
async function login(req, res, next) {
  try {
    const foundUser = await User.getByEmail(req.query.email);
    if (!foundUser.validPassword(req.query.password)) {
      throw new APIError('User email and password combination do not match', httpStatus.UNAUTHORIZED);
    }
    const token = generateJWT(foundUser.safeModel());
    return res.json({
      accessToken: token,
      user: foundUser.safeModel(),
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Register a new user
 * @property {string} req.query.email - The email of user.
 * @property {string} req.query.password - The password of user.
 * @property {string} req.query.firstName - The firstName of user.
 * @property {string} req.query.lastName - The lastName of user.
 * @returns {User}
 */
async function register(req, res, next) {
  const {email, firstName, lastName, password} = req.query;

  const userBody = {email, displayName : firstName + lastName, password};
  const user = new User(userBody);
  
  try {
    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
      throw new APIError('Email must be unique', httpStatus.CONFLICT);
    }
    user.password = user.generatePassword(password);
    const savedUser = await user.save();
    const token = generateJWT(savedUser.safeModel());
    return res.json({
      accessToken: token,
      user: savedUser.safeModel(),
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Get user profile of logged in user
 * @returns {User}
 */
async function getProfile(req, res, next) {
  try {
    const user = await User.get(res.locals.session._id);
    return res.json({user : user.safeModel()});
  } catch (error) {
    return next(error);
  }
}

/**
 * Generates JWT for the payload
 * @param {*} payload - Payload to be signed in JWT
 */
function generateJWT(payload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
    algorithm: 'HS256',
  });
}

module.exports = { login, register, getProfile };
