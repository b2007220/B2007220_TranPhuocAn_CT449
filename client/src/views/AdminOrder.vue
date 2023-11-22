<template>
	<v-app id="inspire" :style="{ background: '#E3DED1' }">
		<SideBar />
		<v-main>
			<v-container class="px-6 mt-n2" fluid>
				<v-row>
					<v-col cols="12" sm="6">
						<v-card color="#908471" theme="dark" class="rounded-xl" height="100">
							<div class="d-flex flex-no-wrap justify-space-between">
								<div>
									<v-card-title class="text-h5 mt-3">Doanh thu </v-card-title>
									<v-card-subtitle>{{ summary }}</v-card-subtitle>
								</div>
							</div>
						</v-card>
					</v-col>
					<v-col cols="12" sm="6">
						<v-card color="#908471" theme="dark" class="rounded-xl" height="100">
							<div class="d-flex flex-no-wrap justify-space-between">
								<div>
									<v-card-title class="text-h5 mt-3">Sản phẩm bán được</v-card-title>
									<v-card-subtitle>{{ summaryProduct }}</v-card-subtitle>
								</div>
							</div>
						</v-card>
					</v-col>
					<v-col cols="12" sm="12" class="mt-n4">
						<v-card class="mx-auto border rounded p-" max-width="100%">
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
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import orderService from '../services/order.service';
</script>
<script>
const FakeAPI = {
	async fetch({ page, itemsPerPage, sortBy }) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const start = (page - 1) * itemsPerPage;
				const end = start + itemsPerPage;
				const items = orders.slice();

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
const orders = await orderService.getAll();

const summary = orders.reduce((acc, cur) => acc + cur.total, 0);
const summaryProduct = orders.reduce((acc, cur) => acc + cur.orderDetails.quantity, 0);
export default {
	data: () => ({
		itemsPerPage: 5,
		headers: [
			{
				title: 'Đơn đặt hàng',
				align: 'start',
				sortable: false,
				key: 'customer.account.fullName',
			},
			{ title: 'Tên sản phẩm', key: 'orderDetails.product.name', align: 'end' },
			{ title: 'Số lượng', key: 'orderDetails.quantity', align: 'end' },
			{ title: 'Ngày đặt hàng', key: 'orderDate', align: 'end' },
			{ title: 'Nhân viên phụ trách', key: 'employee.account.fullName', align: 'end' },
			{ title: 'Trạng thái', key: 'status', align: 'end' },
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
