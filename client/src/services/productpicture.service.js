import createClient from '../utils/client';

class ProductPictureService {
	#client;

	constructor() {
		this.#client = createClient('product-picture');
	}

	async getAll() {
		return await this.#client.get('');
	}

	async getOne(id) {
		return await this.#client.get(id);
	}

	async create(data) {
		return await this.#client.post('', data);
	}

	async update(id, data) {
		return await this.#client.put(id, data);
	}

	async delete(id) {
		return await this.#client.delete(id);
	}
}

export default new ProductPictureService();
