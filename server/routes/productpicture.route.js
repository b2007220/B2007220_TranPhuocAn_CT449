const router = require('express').Router();

const productPictureController = require('../controllers/productpicture.controller');

router.route('/').post(productPictureController.create).get(productPictureController.findAll);

router
	.route('/:id')
	.get(productPictureController.findOne)
	.put(productPictureController.update)
	.delete(productPictureController.delete);

module.exports = router;
