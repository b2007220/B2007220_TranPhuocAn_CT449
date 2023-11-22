const router = require('express').Router();

const orderController = require('../controllers/order.controller');

router.route('/').post(orderController.create).get(orderController.findAll);

router.route('/make-payment').post(orderController.makePayment);

router.route('/customer').get(orderController.findAllByCustomer);

router.route('/accept/:id').put(orderController.acceptOrder);
router.route('/reject/:id').put(orderController.rejectOrder);
router.route('/complete/:id').put(orderController.completeOrder);

router.route('/:id').get(orderController.findOne).put(orderController.update).delete(orderController.delete);



module.exports = router;
