const express = require('express');
const { Joi } = require('express-validation');
const productCtrl = require('./product.controller');
const { validate } = require('../../helpers');

const router = express.Router();

const paramValidation = {
  createProduct: {
    body: Joi.object({
      cover: Joi.string().required(),
      name: Joi.string().required(),
    }),
  },
  getProduct: {
    params: Joi.object({
      name: Joi.string().required(),
    }),
  },
};

router.route('/')
  /** GET /api/books - Get list of books */
  .get(productCtrl.list)

  /** POST /api/books - Create new book */
  .post(validate(paramValidation.createProduct), productCtrl.create);

router.route('/:name')
  /** GET /api/books/:bookId - Get book */
  .get(validate(paramValidation.getProduct), productCtrl.get)

  // /** PUT /api/books/:bookId - Update book */
  // .put(validate(paramValidation.updateBook), productCtrl.update)

  // /** DELETE /api/books/:bookId - Delete book */
  // .delete(productCtrl.remove);

/** Load book when API with bookId route parameter is hit */
router.param('productId', productCtrl.load);

module.exports = router;
