const router = require('express').Router();

const orderController = require('../controllers/order.controller');

router.route('/').post(orderController.create).get(orderController.findAll);

router.route('/:id').get(orderController.findOne).put(orderController.update).delete(orderController.delete);

router.route('/make-payment').post(orderController.makePayment);

module.exports = router;
