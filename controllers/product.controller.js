const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Product = require('../models/product');
const validator = require('../middlewares/validatorHandler');

module.exports.getProductList = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const productFilters = {};
  if (category) productFilters.categories = category;

  const [categories, products] = await Promise.all([
    Category.find(),
    Product.find(productFilters),
  ]);

  res.render('product_list', {
    categories,
    products,
  });
});

module.exports.getProductDetail = asyncHandler(async (req, res) => {
  res.send('getProductDetail: NOT YET IMPLEMENTED');
});

module.exports.getAddProduct = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.render('product_form', {
    title: 'Add Product',
    categories,
    product: null,
    errors: null,
  })
});

module.exports.postAddProduct = [
  validator.validateName(),
  validator.validateNumber('stock'),
  validator.validateNumber('price'),
  validator.validateString('description', {max: 1000}),
  validator.validateMongoId('categories'),
  asyncHandler(async (req, res) => {

    if (
      req.body.categories &&
      !Array.isArray(req.body.categories)) {
        req.body.categories = [req.body.categories]
    }
    const product = Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      categories: req.body.categories,
    })

    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await Category.find();
      res.render('product_form',{
        title: 'Add Product',
        product: product,
        categories: categories,
        errors: errors.array(),
      });
      return;
    }

    await product.save();
    res.redirect('/products');
  })
];

module.exports.getUpdateProduct = asyncHandler(async (req, res) => {
  res.send('getUpdateProduct: NOT YET IMPLEMENTED');
});

module.exports.postUpdateProduct = asyncHandler(async (req, res) => {
  res.send('postUpdateProduct: NOT YET IMPLEMENTED');
});

module.exports.getDeleteProduct = asyncHandler(async (req, res) => {
  res.send('getDeleteProduct: NOT YET IMPLEMENTED');
});

module.exports.postDeleteProduct = asyncHandler(async (req, res) => {
  res.send('postDeleteProduct: NOT YET IMPLEMENTED');
});
