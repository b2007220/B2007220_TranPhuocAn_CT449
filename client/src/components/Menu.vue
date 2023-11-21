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
export default {
	data: () => ({
		items: [
			{ title: 'Thông tin cá nhân' },
			{ title: 'Đổi mật khẩu' },
			{ title: 'Lịch sử mua hàng' },
			{ title: 'Đăng xuất' },
		],
	}),
	methods: {
		handleItemClick(item) {
			if (item.title === 'Đăng xuất') {
				this.logout();
			} else {
			}
		},
		logout() {
			alert('Đăng xuất thành công');
			const authStore = useAuthStore();
			if (authStore) {
				authStore.logout();
			} else {
				console.error('Auth store not available');
			}
		},
	},
};
</script>
