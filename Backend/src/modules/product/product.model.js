const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Book Schema
 */
const ProductSchema = new mongoose.Schema({
  cover: {
    type: String,
    required : true,
  },
  images: {
    type: Array,
    default : []
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default : null
  },
  sku: {
    type: String,
    default : null,
  },
  tags: {
    type: Array,
    default : null,
  },
  price: {
    type: Number,
    default : null,
  },
  priceSale: {
    type: Number,
    default : null,
  },
  inventoryType: {
    type: String,
    default : 'out_of_stock',
  },
  description: {
    type: String,
    default : null,
  },
  category: {
    type: String,
    default : null,
  },
  gender: {
    type: String,
    default : null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * - pre-post-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ProductSchema.method({});

/**
 * Statics
 */
ProductSchema.statics = {
  /**
   * Get book
   * @param {ObjectId} id - The objectId of book.
   * @returns {Promise<Book, APIError>}
   */
  async get(id) {
    const product = await this.findById(id).exec();
    if (!product) {
      throw new APIError('No such product exists!', httpStatus.NOT_FOUND);
    }
    return product;
  },

  /**
   * Get book by name
   * @param {string} name - The objectId of book.
   * @returns {Promise<Book, APIError>}
   */

  async getByName(name) {
    const product = await this.find({name}).exec();
    if (!product) {
      throw new APIError('No such product exists!', httpStatus.NOT_FOUND);
    }
    return product;
  },

  /**
   * List books and populate owner details to wich the book belongs to.
   * @returns {Promise<Product[]>}
   */
  list() {
    return this.find()
      .exec();
  },

  /**
   * List books in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of books to be skipped.
   * @param {number} limit - Limit number of books to be returned.
   * @returns {Promise<Book[]>}
   */
  listLazy({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },
};

/**
 * @typedef Book
 */
module.exports = mongoose.model('Product', ProductSchema);
