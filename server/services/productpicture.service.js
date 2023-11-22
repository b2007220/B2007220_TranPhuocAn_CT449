const { PrismaClient } = require('@prisma/client');

class ProductPictureService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(productPicture) {
		const newProductPicture = await this.#client.producpicture.create({ data: productPicture });
		return newProductPicture;
	}

	async findAll() {
		const productPictures = await this.#client.productpicture.findMany();
		return productPictures;
	}

	async findOne(id) {
		const productPicture = await this.#client.productpicture.findUnique({ where: { id } });
		return productPicture;
	}

	async update(id, productPicture) {
		const updatedProductPicture = await this.#client.productpicture.update({ where: { id }, data: productPicture });
		return updatedProductPicture;
	}

	async delete(id) {
		return await this.#client.productpicture.delete({ where: { id } });
	}
}
module.exports = new ProductPictureService();
