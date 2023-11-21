
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
			const { cartItems, shippingAddress, total } = req.body;
			const order = await orderService.create({total, customerId: req.user.id});
			cartItems.forEach(async (product) => {
				if (!product) throw new Error('Product not found');
				await productService.update(product.id, { stock: product.stock - product.quantity });
				await orderDetailService.create({productId: product.id, orderId: order.id, quantity: product.quantity, unitPrice: product.price - (product.discount*product.price/100)});
			});
			res.send(order);
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new OrderController();
