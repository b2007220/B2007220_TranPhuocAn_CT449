const { PrismaClient } = require('@prisma/client');

class OrderService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(order) {
		const newOrder = await this.#client.order.create({ data: order });
		return newOrder;
	}

	async findAll() {
		const orders = await this.#client.order.findMany();
		return orders;
	}

	async findOne(id) {
		const order = await this.#client.order.findUnique({ where: { id } });
		return order;
	}

	async update(id, order) {
		const updatedOrder = await this.#client.order.update({ where: { id }, data: order });
		return updatedOrder;
	}

	async delete(id) {
		return await this.#client.order.delete({ where: { id } });
	}
}
module.exports = new OrderService();
