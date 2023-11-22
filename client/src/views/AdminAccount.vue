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
					>
						<template #item.edit="{ item }">
							<v-btn icon="mdi mdi-account-circle" @click="addAdmin(item)"></v-btn>
						</template>
					</v-data-table-server>
				</v-card>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import accountService from '../services/account.service';

const addAdmin = async (user) => {
	try {
		const res = await accountService.addAdmin(user.id);

		alert('Thêm quyền quản trị thành công');
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
				const items = accounts.slice();

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

const accounts = await accountService.getAll();
export default {
	data: () => ({
		itemsPerPage: 5,
		headers: [
			{
				title: 'Họ tên',
				align: 'start',
				sortable: false,
				key: 'fullName',
			},
			{ title: 'Gmail', key: 'username', align: 'end' },
			{ title: 'Số điện thoại', key: 'phone', align: 'end' },
			{ title: 'Địa chỉ', key: 'address', align: 'end' },
			{ title: 'Ngày tạo', key: 'createdAt', align: 'end' },
			{ title: 'Ngày cập nhật', key: 'updatedAt', align: 'end' },
			{ title: 'Nhân viên', key: 'isEmployee', align: 'end' },
			{ title: 'Chỉnh sửa', key: 'edit', align: 'end' },
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
