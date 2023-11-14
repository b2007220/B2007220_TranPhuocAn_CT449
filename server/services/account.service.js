const { PrismaClient } = require('@prisma/client');

class AccountService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(account) {
		const newAccount = await this.#client.account.create({ data: account });
		return newAccount;
	}

	async findAll() {
		const accounts = await this.#client.account.findMany();
		return accounts;
	}

	async findOne(id) {
		const account = await this.#client.account.findUnique({ where: { id } });
		return account;
	}

	async update(id, account) {
		const updatedAccount = await this.#client.account.update({ where: { id }, data: account });
		return updatedaccount;
	}

	async delete(id) {
		return await this.#client.account.delete({ where: { id } });
	}
}
module.exports = new AccountService();