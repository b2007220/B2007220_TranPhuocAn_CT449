import createClient from '../utils/client';

class ProductService {
	#client;

	constructor() {
		this.#client = createClient('product/');
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
	async getProductsByPriceAsc() {
		return await this.#client.get('price/asc');
	}
	async getProductsByPriceDesc() {
		return await this.#client.get('price/desc');
	}
}

export default new ProductService();
