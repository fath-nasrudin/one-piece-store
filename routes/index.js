var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/products', require('./product.routes'));
router.use('/categories', require('./category.routes'));

module.exports = router;
