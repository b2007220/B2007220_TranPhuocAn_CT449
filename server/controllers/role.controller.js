const roleService = require('../services/role.service');

class RoleController {
	async create(req, res, next) {
		try {
			const role = await roleService.create(req.body);
			res.json(role);
		} catch (error) {
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			const roles = await roleService.findAll();
			res.send(roles);
		} catch (error) {
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			const role = await roleService.findOne(req.params.id);
			res.send(role);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const role = await roleService.update(req.params.id, req.body);
			res.send(role);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const role = await roleService.findOne(req.params.id);
			if (!role) return res.status(404).send({ message: 'Role not found' });
			res.send(await roleService.delete(req.params.id));
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new RoleController();
