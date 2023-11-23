<template>
	<v-app id="inspire" :style="{ background: '#E3DED1' }">
		<SideBar />
		<v-main>
			<v-container class="px-6 mt-n2" fluid>
				<v-card class="mx-auto border rounded p-" max-width="100%">
					<v-data-table-server
						v-model:items-per-page="itemsPerPage"
						:headers="headers"
						:items-length="totalItems"
						:items="serverItems"
						:loading="loading"
						item-value="name"
						@update:options="loadItems"
						><template #item.edit="{ item }">
							<v-btn icon="mdi mdi-cancel" @click="rejectOrder(item)"></v-btn>
							<v-btn icon="mdi mdi-check" @click="acceptOrder(item)"></v-btn>
							<v-btn icon="mdi mdi-check-all" @click="completeOrder(item)"></v-btn></template
					></v-data-table-server>
				</v-card>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import orderService from '../services/order.service';
const rejectOrder = async (order) => {
	try {
		const res = await orderService.rejectOrder(order.id);

		alert('Từ chối đơn hàng thành công');
	} catch (error) {
		console.log(error);
	}
};
const acceptOrder = async (order) => {
	try {
		const res = await orderService.acceptOrder(order.id);

		alert('Đã duyệt đơn hàng thành công');
	} catch (error) {
		console.log(error);
	}
};
const completeOrder = async (order) => {
	try {
		const res = await orderService.completeOrder(order.id);

		alert('Đã hoàn thành đơn hàng');
	} catch (error) {
		console.log(error);
	}
};
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

const summaryQuantity = orders.reduce(
	(acc, cur) => acc + cur.orderDetails.reduce((quantityAcc, orderDetail) => quantityAcc + orderDetail.quantity, 0),
	0,
);
const productNames = orders.map((order) => order.orderDetails.map((orderDetail) => orderDetail.product.name)).flat();
export default {
	data: () => ({
		itemsPerPage: 5,
		headers: [
			{
				title: 'Khách hàng',
				align: 'start',
				sortable: false,
				key: 'customer.account.fullName',
			},
			{ title: 'Tên sản phẩm', key: 'orderDetails[0].product.name', align: 'end' },
			{ title: 'Số lượng', key: 'summaryQuantity', align: 'end' },
			{ title: 'Ngày đặt hàng', key: 'orderDate', align: 'end' },
			{ title: 'Nhân viên phụ trách', key: 'employee.account.fullName', align: 'end' },
			{ title: 'Trạng thái', key: 'status', align: 'end' },
			{ title: 'Chỉnh sửa', key: 'edit', align: 'end' },
		],
		serverItems: [],
		loading: true,
		totalItems: 0,
		summaryQuantity: summaryQuantity,
		productNames: productNames,
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
