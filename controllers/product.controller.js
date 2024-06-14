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

module.exports.getProductDetail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('categories', 'name');

  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    next(err);
    return;
  }

  res.render('product_detail', {
    title: 'Detail Product',
    product,
  })
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

module.exports.getUpdateProduct = asyncHandler(async (req, res, next) => {

  const [product, categories] = await Promise.all([
    Product.findById(req.params.id).populate('categories'),
    Category.find(),
  ])

  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    next(err);
    return;
  }

  res.render('product_form', {
    title: 'Edit Product',
    categories,
    product,
    errors: null,
  })
});

module.exports.postUpdateProduct = [
  validator.validateName(),
  validator.validateNumber('stock'),
  validator.validateNumber('price'),
  validator.validateString('description', {max: 1000}),
  validator.validateMongoId('categories'),
  asyncHandler(async (req, res, next) => {

    if (
      req.body.categories &&
      !Array.isArray(req.body.categories)) {
        req.body.categories = [req.body.categories]
    }
    
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await Category.find();
      res.render('product_form',{
        title: 'Add Product',
        product: req.body,
        categories: categories,
        errors: errors.array(),
      });
      return;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      next(err);
      return;
    }

    res.redirect('/products');
  })
];

module.exports.getDeleteProduct = asyncHandler(async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    next(err);
    return;
  }

  res.render('product_delete', {
    title: 'Delete Product',
    product,
  })
});

module.exports.postDeleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    next(err);
    return;
  }

  res.redirect('/products')
});
