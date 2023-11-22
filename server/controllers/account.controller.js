const accountService = require('../services/account.service');
const employeeService = require('../services/employee.service');
class AccountController {
	async create(req, res, next) {
		try {
			const account = await accountService.create(req.body);
			res.json(account);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const accounts = await accountService.findAll();
			res.send(accounts);
		} catch (error) {
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const account = await accountService.findOne(req.params.id);
			res.send(account);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const account = await accountService.update(req.user.id, req.body);
			res.send(account);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const account = await accountService.findOne(req.params.id);
			if (!account) return res.status(404).send({ message: 'Account not found' });
			res.send(await accountService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
	async updatePassword(req, res, next) {
		try {
			const account = await accountService.updatePassword(req.user.id, req.body.password);
			res.send(account);
		} catch (error) {
			next(error);
		}
	}

	async addAdmin(req, res, next) {
		try {
			const user = await accountService.update(req.body.id, { isEmployee: true });
			const employee = await employeeService.create({ accountId: user.id });
			res.send(employee);
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new AccountController();
