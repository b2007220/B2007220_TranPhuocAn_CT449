const { PrismaClient, Status } = require('@prisma/client');

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
		const orders = await this.#client.order.findMany({
			include: {
				customer: {
					include: {
						account: true,
					},
				},
				employee: {
					include: {
						account: true,
					},
				},
				orderDetails: {
					include: {
						product: true,
					},
				},
			},
		});
		return orders;
	}
	async findAllByCustomer(customerId) {
		const orders = await this.#client.order.findMany({
			where: { customerId: customerId },
			include: {
				customer: {
					include: {
						account: true,
					},
				},
				employee: {
					include: {
						account: true,
					},
				},
				orderDetails: {
					include: {
						product: true,
					},
				},
			},
		});
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
	async acceptOrder(id) {
		const order = await this.#client.order.update({ where: { id }, data: { status: Status.DELIVERING } });
		return order;
	}
	async rejectOrder(id) {
		const order = await this.#client.order.update({ where: { id }, data: { status: Status.UNACCEPTED } });
		return order;
	}
	async completeOrder(id) {
		const order = await this.#client.order.update({ where: { id }, data: { status: Status.DELIVERED } });
		return order;
	}
}
module.exports = new OrderService();
