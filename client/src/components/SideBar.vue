<template>
	<v-navigation-drawer v-model="drawer" color="#535c68" class="rounded-e-xl" width="250">
		<v-list>
			<v-list-item v-for="(item, i) in links" :key="i" :value="item" active-class="border" :ripple="false">
				<template v-slot:prepend>
					<v-icon :icon="item.icon" color="#f1f2f6"></v-icon>
				</template>
				<v-list-item-title v-text="item.text"></v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
const links = [
	{ text: 'Tài khoản', icon: 'mdi mdi-home-outline' },
	{ text: 'Sản phẩm', icon: 'mdi mdi-file-chart-outline' },
	{ text: 'Đơn đặt hàng', icon: 'mdi mdi-chart-pie' },
	{ text: 'Trở về trang chủ', icon: 'mdi mdi-logout' },
];

const drawer = ref(null);
</script>

<script>
export default {
	data: () => ({
		drawer: null,
	}),
};
</script>
<style scoped></style>
