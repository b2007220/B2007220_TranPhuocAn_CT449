const { PrismaClient } = require('@prisma/client');

class ProductPictureService {
	#client;
	constructor() {
		this.#client = new PrismaClient();
	}

	async create(productPicture) {
		const newProductPicture = await this.#client.productPicture.create({ data: productPicture });
		return newProductPicture;
	}

	async findAll() {
		const productPictures = await this.#client.productPicture.findMany({
			include: {
				product: true,
			},
		});
		return productPictures;
	}

	async findOne(id) {
		const productPicture = await this.#client.productPicture.findUnique({ where: { id } });
		return productPicture;
	}

	async update(id, productPicture) {
		const updatedProductPicture = await this.#client.productPicture.update({ where: { id }, data: productPicture });
		return updatedProductPicture;
	}

	async delete(id) {
		return await this.#client.productPicture.delete({ where: { id } });
	}
}
module.exports = new ProductPictureService();
