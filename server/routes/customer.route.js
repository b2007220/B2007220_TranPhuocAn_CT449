const router = require('express').Router();

const customerController = require('../controllers/customer.controller');

router.route('/').post(customerController.create).get(customerController.findAll);

router.route('/:id').get(customerController.findOne).put(customerController.update).delete(customerController.delete);

module.exports = router;
