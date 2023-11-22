import createClient from '../utils/client';

class EmployeeService {
	#client;

	constructor() {
		this.#client = createClient('employee');
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

	async isEmployee() {
		const employee = await this.#client.get('/is-employee');
		return employee;
	}
}

export default new EmployeeService();
