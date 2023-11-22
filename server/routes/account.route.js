const router = require('express').Router();

const accountController = require('../controllers/account.controller');

router.route('/').post(accountController.create).get(accountController.findAll).put(accountController.update);
router.route('/password').put(accountController.updatePassword);
router.route('/:id').get(accountController.findOne).delete(accountController.delete);
router.route('/add-admin').post(accountController.addAdmin);

module.exports = router;
