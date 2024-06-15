const router = require('express').Router();
const ProductController = require('../controllers/product.controller');
const upload = require('../middlewares/imageHandler');

// add image handler middleware

router.route('/').get(ProductController.getProductList);

router
  .route('/create')
  .get(ProductController.getAddProduct)
  .post(upload.single('image'), ProductController.postAddProduct);

router
  .route('/:id/update')
  .get(ProductController.getUpdateProduct)
  .post(upload.single('image'), ProductController.postUpdateProduct);

router
  .route('/:id/delete')
  .get(ProductController.getDeleteProduct)
  .post(ProductController.postDeleteProduct);

router.route('/:id').get(ProductController.getProductDetail);

module.exports = router;
