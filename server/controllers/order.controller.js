const orderService = require('../services/order.service');
const productService = require('../services/product.service');
const orderDetailService = require('../services/orderdetail.service');

class OrderController {
	async create(req, res, next) {
		try {
			const order = await orderService.create(req.body);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const orders = await orderService.findAll();
			res.send(orders);
		} catch (error) {
			next(error);
		}
	}
	async findAllByCustomer(req, res, next) {
		try {
			const orders = await orderService.findAllByCustomer(req.user.id);
			res.send(orders);
		} catch (error) {
			next(error);
		}
	}
	async findOne(req, res, next) {
		try {
			const order = await orderService.findOne(req.params.id);
			res.send(order);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const order = await orderService.update(req.params.id, req.body);
			res.send(order);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const order = await orderService.findOne(req.params.id);
			if (!order) return res.status(404).send({ message: 'Order not found' });
			res.send(await orderService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	async makePayment(req, res, next) {
		try {
			const { products, total } = req.body;
			const order = await orderService.create({ total, customerId: req.user.id });
			products.forEach(async (termProduct) => {
				if (!termProduct) throw new Error('Product not found');
				const product = await productService.findOne(termProduct.id);
				await productService.update(termProduct.id, { stock: (product.stock - termProduct.stock) });
				await orderDetailService.create({
					productId: termProduct.id,
					orderId: order.id,
					quantity: termProduct.stock,
					unitPrice: termProduct.price * termProduct.stock,
				});
			});
			res.send(order);
		} catch (error) {
			next(error);
		}
	}
	async acceptOrder(req, res, next) {
		try {
			const order = await orderService.acceptOrder(req.params.id);
			res.send(order);
		} catch (error) {
			next(error);
		}
	}
	async rejectOrder(req, res, next) {
		try {
			const order = await orderService.rejectOrder(req.params.id);
			res.send(order);
		} catch (error) {
			next(error);
		}
	}
	async completeOrder(req, res, next) {
		try {
			const order = await orderService.completeOrder(req.params.id);
			res.send(order);
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new OrderController();
