const asyncHandler = require('express-async-handler');
const { validateName, validationResult } = require('../middlewares/validatorHandler');
const Category = require('../models/category');

module.exports.getCategoryList = asyncHandler(async (req, res) => {
  res.send('getCategoryList: NOT YET IMPLEMENTED');
});

module.exports.getCategoryDetail = asyncHandler(async (req, res) => {
  res.send('getCategoryDetail: NOT YET IMPLEMENTED');
});

module.exports.getAddCategory = asyncHandler(async (req, res) => {
  res.render('category_form', {
    title: 'Add Category',
    category: null,
    errors: null,
  })
});

module.exports.postAddCategory = [
  validateName(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Add Category',
        category,
        errors: errors.array(),
      })
      return;
    }

    await category.save();
    res.redirect('/products');
  })
];

module.exports.getUpdateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render('category_form', {
    title: 'Edit Category',
    category,
    errors: null,
  })
});

module.exports.postUpdateCategory = [
  validateName(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newCategoryData = {
      name: req.body.name,
    }

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Edit Category',
        category: newCategoryData,
        errors: errors.array(),
      })
      return;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, newCategoryData);

    if (!category) {
      const err = new Error('Category Not Found');
      err.status = 404;
      next(err)
    }

    res.redirect('/products');
  })
];

module.exports.getDeleteCategory = asyncHandler(async (req, res) => {
  res.send('getDeleteCategory: NOT YET IMPLEMENTED');
});

module.exports.postDeleteCategory = asyncHandler(async (req, res) => {
  res.send('postDeleteCategory: NOT YET IMPLEMENTED');
});