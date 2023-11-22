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
								><template #item.url="{ value }">
									<v-img :src="value" height="150" cover width="150"></v-img>
								</template>
							</v-data-table-server>
						</v-card>
					</v-container>
				</v-col>
				<v-col cols="12" sm="4">
					<v-container class="mt-n2" fluid>
						<v-card>
							<v-card-title class="text-h5">Thêm sản phẩm</v-card-title>
							<v-card-text>
								<v-form @submit.prevent="createProductPicture">
									<v-text-field
										v-model="productPicture.url"
										label="Đường dẫn đến ảnh"
										required
									></v-text-field>
									<v-select
										v-model="productPicture.product"
										:items="products"
										label="Sản phẩm"
										:item-props="itemProps"
										required
									></v-select>
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
import { ref, onMounted } from 'vue';
import SideBar from '../components/SideBar.vue';
import productPictureService from '../services/productPicture.service';
import productService from '../services/product.service';
</script>
<script>
const FakeAPI = {
	async fetch({ page, itemsPerPage, sortBy }) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const start = (page - 1) * itemsPerPage;
				const end = start + itemsPerPage;
				const items = productPictures.slice();

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
const productPictures = await productPictureService.getAll();

const products = ref([]);

const loadProducts = async () => {
	try {
		const result = await productService.getAll();
		products.value = result;
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};

const productPicture = ref({
	url: '',
	product: null,
});

const createProductPicture = async () => {
	try {
		const newProductPicture = await productPictureService.create(productPicture.value);
		alert('Thêm sản phẩm thành công');
		serverItems.value.push(newProductPicture);
	} catch (error) {
		console.log(error);
	}
};
const itemProps = (products) => {
	return {
		title: products.name,
	};
};
loadProducts();
export default {
	data: () => ({
		itemsPerPage: 5,
		headers: [
			{
				title: 'Tên sản phẩm',
				align: 'start',
				sortable: false,
				key: 'product.name',
			},
			{ title: 'Hình ảnh', key: 'url', align: 'start' },
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
