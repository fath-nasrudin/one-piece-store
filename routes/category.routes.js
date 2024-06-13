const router = require('express').Router();
const CategoryController = require('../controllers/category.controller');

router.route('/')
  .get(CategoryController.getCategoryList);

router.route('/create')
  .get(CategoryController.getAddCategory)
  .post(CategoryController.postAddCategory);

router.route('/:id/update')
  .get(CategoryController.getUpdateCategory)
  .post(CategoryController.postUpdateCategory);

router.route('/:id/delete')
  .get(CategoryController.getDeleteCategory)
  .post(CategoryController.postDeleteCategory);

router.route('/:id')
  .get(CategoryController.getCategoryDetail);
  
module.exports = router;