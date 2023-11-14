const { Router } = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.use('/account', require('./account.route'));
router.use('/auth', require('./auth.route'));
router.use('/customer', require('./customer.route'));
router.use('/role', require('./role.route'));
router.use('/employee', require('./employee.route'));
router.use('/product', require('./product.route'));
router.use('/order', require('./order.route'));
router.use('/order-detail', require('./orderdetail.route'));
router.use('/product-picture', require('./productpicture.route'));

module.exports = router;
