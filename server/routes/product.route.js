const router = require('express').Router();

const productController = require('../controllers/product.controller');

router.route('/').post(productController.create).get(productController.findAll);

router.route('/:id').get(productController.findOne).put(productController.update).delete(productController.delete);

module.exports = router;
