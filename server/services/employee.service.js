const { PrismaClient } = require('@prisma/client');

class EmployeeService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(employee) {
		const newEmployee = await this.#client.employee.create({ data: employee });
		return newEmployee;
	}

	async findAll() {
		const employees = await this.#client.employee.findMany();
		return employees;
	}

	async findOne(id) {
	
		const employee = await this.#client.employee.findFirst({ where: { accountId:id } });
		return employee;
	}

	async update(id, employee) {
		const updatedEmployee = await this.#client.employee.update({ where: { id }, data: employee });
		return updatedEmployee;
	}

	async delete(id) {
		return await this.#client.employee.delete({ where: { id } });
	}
}
module.exports = new EmployeeService();
