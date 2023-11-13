const employeeService = require('../services/employee.service');

class EmployeeController {
	async create(req, res, next) {
		try {
			const employee = await employeeService.create(req.body);
			res.json(employee);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const employees = await employeeService.findAll();
			res.send(employees);
		} catch (error) {
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const employee = await employeeService.findOne(req.params.id);
			res.send(employee);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const employee = await employeeService.update(req.params.id, req.body);
			res.send(employee);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const employee = await employeeService.findOne(req.params.id);
			if (!employee) return res.status(404).send({ message: 'Employee not found' });
			res.send(await employeeService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new EmployeeController();
