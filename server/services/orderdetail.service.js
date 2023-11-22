const { PrismaClient } = require('@prisma/client');

class OrderDetailService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(orderDetail) {
		const newOrderDetail = await this.#client.orderDetail.create({ data: orderDetail });
		return newOrderDetail;
	}

	async findAll() {
		const employees = await this.#client.orderDetail.findMany();
		return employees;
	}

	async findOne(id) {
		const employee = await this.#client.orderDetail.findUnique({ where: { id } });
		return employee;
	}

	async update(id, employee) {
		const updatedEmployee = await this.#client.orderDetail.update({ where: { id }, data: employee });
		return updatedEmployee;
	}

	async delete(id) {
		return await this.#client.orderDetail.delete({ where: { id } });
	}
}
module.exports = new OrderDetailService();
