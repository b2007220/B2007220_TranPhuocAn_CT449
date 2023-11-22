import createClient from '../utils/client';

class AccountService {
	#client;

	constructor() {
		this.#client = createClient('account');
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
	async update(data) {
		const user = await this.#client.put('/',data)
		return user;
	}
	async delete(id) {
		return await this.#client.delete(id);
	}
	async updatePassword(data){
		const user = await this.#client.put('/password',data);
		return user;
	}
}

export default new AccountService();
