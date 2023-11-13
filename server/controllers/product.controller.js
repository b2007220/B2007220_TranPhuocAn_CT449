const productService = require('../services/product.service');

class ProductController {
	async create(req, res, next) {
		try {
			const product = await productService.create(req.body);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const products = await productService.findAll();
			res.send(products);
		} catch (error) {
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const product = await productService.findOne(req.params.id);
			res.send(product);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const product = await productService.update(req.params.id, req.body);
			res.send(product);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const product = await productService.findOne(req.params.id);
			if (!product) return res.status(404).send({ message: 'Product not found' });
			res.send(await productService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new ProductController();
