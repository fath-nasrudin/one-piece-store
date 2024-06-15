const router = require('express').Router();
const CategoryController = require('../controllers/category.controller');
const { authorize } = require('../middlewares/authHandler');

router.route('/')
  .get(CategoryController.getCategoryList);

router.route('/create')
  .get(CategoryController.getAddCategory)
  .post(CategoryController.postAddCategory);

router.route('/:id/update')
  .get(CategoryController.getUpdateCategory)
  .post(authorize(), CategoryController.postUpdateCategory);

router.route('/:id/delete')
  .get(CategoryController.getDeleteCategory)
  .post(authorize(), CategoryController.postDeleteCategory);

router.route('/:id')
  .get(CategoryController.getCategoryDetail);
  
module.exports = router;