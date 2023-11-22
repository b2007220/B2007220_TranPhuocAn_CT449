const { Router } = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.use('/account', authMiddleware, require('./account.route'));
router.use('/auth', require('./auth.route'));
router.use('/customer', authMiddleware, require('./customer.route'));
router.use('/role', authMiddleware, require('./role.route'));
router.use('/employee', authMiddleware, require('./employee.route'));
router.use('/product', authMiddleware, require('./product.route'));
router.use('/order', authMiddleware, require('./order.route'));
router.use('/order-detail', authMiddleware, require('./orderdetail.route'));
router.use('/product-picture', authMiddleware, require('./productpicture.route'));

module.exports = router;
