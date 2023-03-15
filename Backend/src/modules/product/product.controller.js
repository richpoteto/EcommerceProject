const httpStatus = require('http-status');
const Product = require('./product.model');
const APIError = require('../../helpers/APIError');

/**
 * Load Product and append to req.
 */
async function load(req, res, next, id) {
  try {
    const product = await Product.get(id);
    req.product = product;
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get Product
 * @returns {Product}
 */
function get(req, res) {
  return res.json(req.product);
}

/**
 * Create new Product
 * @property {string} req.body.ProductName - The name of Product.
 * @property {string} req.body.author - Author name of Product.
 * @property {string} req.body.isbn- The isbn of Product.
 * @returns {Product}
 */

async function create(req, res, next) {
  const Product = new Product(req.body);

  try {
    const foundProduct = await Product.findOne({ name: Product.name }).exec();
    if (foundProduct) {
      throw new APIError('Product name must be unique', httpStatus.CONFLICT, true);
    }
    const savedProduct = await Product.save();
    return res.json(savedProduct);
  } catch (error) {
    return next(error);
  }
}

// /**
//  * Update existing Product
//  * @property {string} req.body.name - The name of Product.
//  * @property {string} req.body.author - Author name of Product.
//  * @property {string} req.body.isbn- The isbn of Product.
//  * @returns {Product}
//  */
// async function update(req, res, next) {
//   const { Product } = req;
//   Product.ProductName = req.body.ProductName || Product.ProductName;
//   Product.author = req.body.author || Product.author;
//   Product.isbn = req.body.isbn || Product.isbn;
//   try {
//     const savedProduct = await Product.save();
//     return res.json(savedProduct);
//   } catch (error) {
//     return next(error);
//   }
// }

/**
 * Get Product list.
 * @returns {Product[]}
 */
async function list(req, res, next) {
  try {
    const Products = await Product.list();
    return res.json(Products);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete Product.
 * @returns {Product}
 */
async function remove(req, res, next) {
  const { Product } = req;
  try {
    const deletedProduct = await Product.remove();
    return res.json(deletedProduct);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  load,
  get,
  create,
  // update,
  list,
  remove,
};
