const { PrismaClient } = require('@prisma/client');

class RoleService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(role) {
		const newRole = await this.#client.role.create({ data: role });
		return newRole;
	}

	async findAll() {
		const roles = await this.#client.role.findMany();
		return roles;
	}

	async findOne(id) {
		const role = await this.#client.role.findUnique({ where: { id } });
		return role;
	}

	async update(id, role) {
		const updatedRole = await this.#client.role.update({ where: { id }, data: role });
		return updatedRole;
	}

	async delete(id) {
		return await this.#client.role.delete({ where: { id } });
	}
}
module.exports = new RoleService();
