<template>
	<v-app id="inspire" :style="{ background: '#E3DED1' }">
		<SideBar />
		<v-main>
			<v-row>
				<v-col cols="12" sm="8">
					<v-container class="mt-n2" fluid>
						<v-card>
							<v-data-table-server
								v-model:items-per-page="itemsPerPage"
								:headers="headers"
								:items-length="totalItems"
								:items="serverItems"
								:loading="loading"
								item-value="name"
								@update:options="loadItems"
							></v-data-table-server>
						</v-card>
					</v-container>
				</v-col>
				<v-col cols="12" sm="4">
					<v-container class="mt-n2" fluid>
						<v-card>
							<v-card-title class="text-h5">Thêm sản phẩm</v-card-title>
							<v-card-text>
								<v-form @submit.prevent="createProduct">
									<v-text-field v-model="product.name" label="Tên sản phẩm" required></v-text-field>
									<v-text-field v-model="product.price" label="Giá tiền" required></v-text-field>
									<v-text-field
										v-model="product.description"
										label="Mô tả sản phẩm"
										required
									></v-text-field>
									<v-text-field
										v-model="product.stock"
										label="Số hàng trong kho"
										required
									></v-text-field>
									<v-text-field v-model="product.note" label="Ghi chú" required></v-text-field>
									<v-btn color="#EDE1D2" type="submit">Thêm sản phẩm</v-btn>
								</v-form>
							</v-card-text>
						</v-card>
					</v-container>
				</v-col>
			</v-row>
		</v-main>
	</v-app>
</template>

<script setup>
import { ref } from 'vue';
import SideBar from '../components/SideBar.vue';
import productService from '../services/product.service';
</script>
<script>
const FakeAPI = {
	async fetch({ page, itemsPerPage, sortBy }) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const start = (page - 1) * itemsPerPage;
				const end = start + itemsPerPage;
				const items = products.slice();

				if (sortBy.length) {
					const sortKey = sortBy[0].key;
					const sortOrder = sortBy[0].order;
					items.sort((a, b) => {
						const aValue = a[sortKey];
						const bValue = b[sortKey];
						return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
					});
				}

				const paginated = items.slice(start, end);

				resolve({ items: paginated, total: items.length });
			}, 500);
		});
	},
};
const products = await productService.getAll();
const product = ref({
	name: '',
	price: 0,
	description: '',
	stock: 0,
	note: '',
});
const createProduct = async () => {
	try {
		const newProduct = await productService.create(product.value);
		
		alert('Thêm sản phẩm thành công');
		serverItems.value.push(newProduct);
	} catch (error) {
		console.log(error);
	}
};
export default {
	data: () => ({
		itemsPerPage: 5,
		headers: [
			{
				title: 'Tên sản phẩm',
				align: 'start',
				sortable: false,
				key: 'name',
			},
			{ title: 'Giá sản phẩm', key: 'price', align: 'end' },
			{ title: 'Mô tả sản phẩm', key: 'description', align: 'end' },
			{ title: 'Số lượng trong kho', key: 'stock', align: 'end' },
			{ title: 'Ghi chú', key: 'note', align: 'end' },
		],
		serverItems: [],
		loading: true,
		totalItems: 0,
	}),
	methods: {
		loadItems({ page, itemsPerPage, sortBy }) {
			this.loading = true;
			FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
				this.serverItems = items;
				this.totalItems = total;
				this.loading = false;
			});
		},
	},
	components: {
		SideBar,
	},
};
</script>
<style scoped></style>
