const { PrismaClient } = require('@prisma/client');

class ProductService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(product) {
		const newProduct = await this.#client.product.create({
			data: {
				name: product.name,
				price: parseFloat(product.price),
				stock: parseInt(product.stock),
				description: product.description,
				notes: product.notes,
			},
		});
		return newProduct;
	}

	async findAll() {
		const products = await this.#client.product.findMany({
			include: {
				productPictures: true,
			},
		});
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

	async getProductsByPriceAsc() {
		return await this.#client.product.findMany({
			include: {
				productPictures: true,
			},
			orderBy: { price: 'asc' },
		});
	}

	async getProductsByPriceDesc() {
		return await this.#client.product.findMany({
			include: {
				productPictures: true,
			},
			orderBy: { price: 'desc' },
		});
	}
}
module.exports = new ProductService();
