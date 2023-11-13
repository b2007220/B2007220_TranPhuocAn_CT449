const customerService = require('../services/customer.service');

class CustomerController {
	async create(req, res, next) {
		try {
			const customer = await customerService.create(req.body);
			res.json(customer);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const customers = await customerService.findAll();
			res.send(customers);
		} catch (error) {
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const customer = await customerService.findOne(req.params.id);
			res.send(customer);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const customer = await customerService.update(req.params.id, req.body);
			res.send(customer);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const customer = await customerService.findOne(req.params.id);
            if (!customer) return res.status(404).send({ message: 'Customer not found' });
			res.send(await customerService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new CustomerController();
