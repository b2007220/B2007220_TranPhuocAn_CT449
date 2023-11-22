<template>
	<div
		class="image shape"
		style="
			background: url('https://www.usmagazine.com/wp-content/uploads/2021/10/fall-candle-cozy.jpg?w=1000&h=563&crop=1&quality=86&strip=all');
			background-position: center;
			background-size: cover;
			position: absolute;
			height: 300px;
			width: 100%;
			background-repeat: no-repeat;
		"
	>
		<v-app-bar color="transparent" class="text-white">
			<template v-slot:prepend> </template>
			<template v-if="user">
				<Menu />
			</template>
			<template v-else>
				<Login />
			</template>
			<v-btn prepend-icon="mdi mdi-cart" @click="$emit('toggle-drawer')">Giỏ hàng</v-btn>
		</v-app-bar>
		<v-row>
			<v-col cols="12" sm="12" class="d-flex justify-center align-center">
				<h1 class="top text-white" style="font-size: 50px"><strong>NẾN NHÀ AN</strong></h1>
			</v-col>
			<v-col cols="12" sm="12" class="d-flex justify-center align-center">
				<v-btn rounded="xl" class="tope" to="/" color="#EDE1D2" size="large">Trang chủ</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import Login from './Login.vue';
import Menu from './Menu.vue';
import { useAuthStore } from '../stores';
</script>

<script>
export default {
	computed: {
		user() {
			const authStore = useAuthStore();
			return authStore.getUser;
		},
	},
	components: {
		Login,
		Menu,
	},
};
</script>

<style>
.shape {
	border-radius: 0 0 30% 30%;
}
.top {
	margin-top: 120px;
}
.tope {
	margin-top: 90px;
}
</style>
