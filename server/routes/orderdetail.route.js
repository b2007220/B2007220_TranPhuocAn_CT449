const router = require('express').Router();

const orderDetailController = require('../controllers/orderdetail.controller');

router.route('/').post(orderDetailController.create).get(orderDetailController.findAll);

router
	.route('/:id')
	.get(orderDetailController.findOne)
	.put(orderDetailController.update)
	.delete(orderDetailController.delete);

module.exports = router;
