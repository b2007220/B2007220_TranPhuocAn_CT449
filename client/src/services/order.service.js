import createClient from '../utils/client';

class Order {
	#client;

	constructor() {
		this.#client = createClient('order');
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

export default new Order();
