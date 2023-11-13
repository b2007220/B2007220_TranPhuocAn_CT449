const router = require('express').Router();

const roleController = require('../controllers/role.controller');

router.route('/').post(roleController.create).get(roleController.findAll);

router.route('/:id').get(roleController.findOne).put(roleController.update).delete(roleController.delete);

module.exports = router;