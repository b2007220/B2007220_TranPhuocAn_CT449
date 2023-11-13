const productPictureService = require('../services/productpicture.service');

class ProductPictureController {
	async create(req, res, next) {
		try {
			const productPicture = await productPictureService.create(req.body);
			res.json(productPicture);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const productPictures = await productPictureService.findAll();
			res.send(productPictures);
		} catch (error) {
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const productPictures = await productPictureService.findOne(req.params.id);
			res.send(productPictures);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const productPicture = await productPictureService.update(req.params.id, req.body);
			res.send(productPicture);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const productPicture = await productPictureService.findOne(req.params.id);
			if (!productPicture) return res.status(404).send({ message: 'Product picture not found' });
			res.send(await productPictureService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new ProductPictureController();
