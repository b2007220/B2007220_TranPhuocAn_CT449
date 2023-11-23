const { PrismaClient } = require('@prisma/client');

class CustomerService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(customer) {
		const newCustomer = await this.#client.customer.create({ data: customer });
		return newCustomer;
	}

	async findAll() {
		const customers = await this.#client.customer.findMany();
		return customers;
	}

	async findOne(id) {
		const customer = await this.#client.customer.findFirst({
			where: { accountId: id },
		});
		return customer;
	}

	async update(id, customer) {
		const updatedCustomer = await this.#client.customer.update({ where: { id }, data: customer });
		return updatedCustomer;
	}

	async delete(id) {
		return await this.#client.customer.delete({ where: { id } });
	}
}
module.exports = new CustomerService();
