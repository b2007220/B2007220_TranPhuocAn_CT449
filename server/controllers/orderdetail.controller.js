const orderDetailService = require('../services/orderdetail.service');

class OderDetailController {
	async create(req, res, next) {
		try {
			const orderDetail = await orderDetailService.create(req.body);
			res.json(orderDetail);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const orderDetails = await orderDetailService.findAll();
			res.send(orderDetails);
		} catch (error) {
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const orderDetail = await orderDetailService.findOne(req.params.id);
			res.send(orderDetail);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const orderDetail = await orderDetailService.update(req.params.id, req.body);
			res.send(orderDetail);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const orderDetail = await orderDetailService.findOne(req.params.id);
			if (!orderDetail) return res.status(404).send({ message: 'Order detail not found' });
			res.send(await orderDetailService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new OderDetailController();
