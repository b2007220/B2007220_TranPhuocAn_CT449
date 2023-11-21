const router = require('express').Router();

const productController = require('../controllers/product.controller');

router.route('/').post(productController.create).get(productController.findAll);

router.route('/:id').get(productController.findOne).put(productController.update).delete(productController.delete);

router.route('/price/asc').get(productController.getProductsByPriceAsc);
router.route('/price/desc').get(productController.getProductsByPriceDesc);
module.exports = router;
