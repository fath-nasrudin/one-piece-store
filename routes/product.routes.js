const router = require('express').Router();
const ProductController = require('../controllers/product.controller');

router.route('/').get(ProductController.getProductList);

router
  .route('/create')
  .get(ProductController.getAddProduct)
  .post(ProductController.postAddProduct);

router
  .route('/:id/update')
  .get(ProductController.getUpdateProduct)
  .post(ProductController.postUpdateProduct);

router
  .route('/:id/delete')
  .get(ProductController.getDeleteProduct)
  .post(ProductController.postDeleteProduct);

router.route('/:id').get(ProductController.getProductDetail);

module.exports = router;
