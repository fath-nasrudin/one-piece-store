const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Product = require('../models/product');

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
  res.send('getAddProduct: NOT YET IMPLEMENTED');
});

module.exports.postAddProduct = asyncHandler(async (req, res) => {
  res.send('postAddProduct: NOT YET IMPLEMENTED');
});

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
