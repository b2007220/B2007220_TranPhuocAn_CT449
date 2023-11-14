const router = require('express').Router();

const accountController = require('../controllers/account.controller');

router.route('/').post(accountController.create).get(accountController.findAll);

router.route('/:id').get(accountController.findOne).put(accountController.update).delete(accountController.delete);

module.exports = router;
