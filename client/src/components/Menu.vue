<template>
	<div class="text-center">
		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn v-bind="props" prepend-icon="mdi mdi-account" @click="handleItemClick">Tương tác</v-btn>
			</template>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index" @click="handleItemClick(item)">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
import { useAuthStore } from '../stores';
import employeeService from '../services/employee.service';
export default {
	data: () => ({
		items: [
			{ title: 'Thông tin cá nhân' },
			{ title: 'Lịch sử mua hàng' },
			{ title: 'Đăng xuất' },
			{ title: 'Trang quản trị' },
		],
	}),
	methods: {
		async handleItemClick(item) {
			if (item.title === 'Đăng xuất') {
				this.logout();
			} else if (item.title === 'Trang quản trị') {
				try {
					const employee = await employeeService.isEmployee();
					if (employee) {
						this.$router.push('/admin');
					}
				} catch (error) {
					alert('Bạn không có quyền truy cập');
				}
			} else if (item.title === 'Thông tin cá nhân') {
				this.$router.push('/profile');
			} else if (item.title === 'Lịch sử mua hàng') {
				this.$router.push('/order');
			}
		},
		logout() {
			const authStore = useAuthStore();
			if (authStore) {
				authStore.logout();
			} else {
				console.error('Auth store not available');
			}
			alert('Đăng xuất thành công');
		},
		async isEmployee() {
			return employee;
		},
	},
};
</script>
