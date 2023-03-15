const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const APIError = require('../../helpers/APIError');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    default : "Jon Doe",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    default : null,
  },
  phoneNumber: {
    type: String,
    default : null,
  },
  country: {
    type: String,
    default : null,
  },
  address: {
    type: String,
    default : null,
  },
  state: {
    type: String,
    default : null,
  },
  city: {
    type: String,
    default : null,
  },
  zipCode: {
    type: String,
    default : null,
  },
  about: {
    type: String,
    default : null,
  },
  role: {
    type: String,
    default : 'user',
  },
  isPublic: {
    type: Boolean,
    default : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
  generatePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
  safeModel() {
    return _.omit(this.toObject(), ['password', '__v']);
  },
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    const user = await this.findById(id).exec();
    if (!user) {
      throw new APIError('No such user exists!', httpStatus.NOT_FOUND);
    }
    return user;
  },

  /**
   * Get user by email
   * @param {ObjectId} email - The email of user.
   * @returns {Promise<User, APIError>}
   */
  async getByEmail(email) {
    const user = await this.findOne({ email }).exec();
    if (!user) {
      throw new APIError('No such user exists!', httpStatus.NOT_FOUND);
    }
    return user;
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
