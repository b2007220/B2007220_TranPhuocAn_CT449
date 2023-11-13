const { PrismaClient } = require('@prisma/client');

class ProductService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(product) {
		const newProduct = await this.#client.product.create({ data: product });
		return newProduct;
	}

	async findAll() {
		const products = await this.#client.product.findMany();
		return products;
	}

	async findOne(id) {
		const product = await this.#client.product.findUnique({ where: { id } });
		return product;
	}

	async update(id, product) {
		const updatedProduct = await this.#client.product.update({ where: { id }, data: product });
		return updatedProduct;
	}

	async delete(id) {
		return await this.#client.product.delete({ where: { id } });
	}
}
module.exports = new ProductService();
