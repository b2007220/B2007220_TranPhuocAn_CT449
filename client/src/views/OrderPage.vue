<template>
	<v-app>
		<NavBar @toggle-drawer="toggleDrawer" />
		<v-navigation-drawer
			app
			v-model="drawer"
			absolute
			location="right"
			:temporary="true"
			:hide-overlay="true"
			:width="400"
		>
			<v-card max-width="448" class="mx-auto" color="grey-lighten-3">
				<v-layout>
					<v-app-bar color="teal-darken-4">
						<template v-slot:image>
							<v-img style="background-color: #4F493F;"></v-img>
						</template>
						<v-app-bar-title>Giỏ hàng</v-app-bar-title>
						<v-spacer></v-spacer>
					</v-app-bar>
					<v-main>
						<v-container fluid>
							<v-row dense>
								<v-col cols="12" v-for="item in cartItems" :key="item.id">
									<v-card color="#1F7087" theme="dark">
										<div class="d-flex flex-no-wrap justify-space-between">
											<div>
												<v-card-title class="text-h5"> {{ item.type }} </v-card-title>
												<v-card-subtitle>{{ item.money }}</v-card-subtitle>
												<v-card-actions>
													<v-text-field
														v-model="item.quantity"
														type="number"
														class="ms-2"
														variant="outlined"
														density="compact"
														:min="1"
													>
													</v-text-field>
													<v-btn
														icon="mdi mdi-menu-left"
														size="small"
														@click="decreaseQuantity(item)"
													></v-btn>
													<v-btn
														icon="mdi mdi-menu-right"
														size="small"
														@click="increaseQuantity(item)"
													></v-btn>
													<v-btn @click="removeFromCart(item.id)" size="small">Xóa</v-btn>
												</v-card-actions>
											</div>
											<v-avatar class="ma-3" size="100" rounded="0">
												<v-img :src="item.img" cover></v-img>
											</v-avatar>
										</div>
									</v-card>
								</v-col>
								<v-col cols="12" sm="12" class="d-flex justify-center align-center">
									<v-divider></v-divider>
								</v-col>
								<v-col cols="12" sm="12" class="d-flex justify-center align-center">
									<h3 class="text-h5">
										Tổng tiền:
										{{
											cartItems.reduce(
												(total, item) =>
													total + parseFloat(item.money) * parseInt(item.quantity),
												0,
											)
										}}$
									</h3>
								</v-col>
								<v-col cols="12" sm="12" class="d-flex justify-center align-center">
									<v-divider></v-divider>
								</v-col>
								<v-col cols="12" sm="12" class="d-flex justify-center align-center">
									<v-textarea
										bg-color="white"
										label="Địa chỉ giao hàng"
										rows="1"
										auto-grow
										variant="filled"
									></v-textarea>
								</v-col>

								<v-col cols="12" sm="12" class="d-flex justify-center align-center">
									<v-btn rounded="xl">Thanh toán</v-btn>
								</v-col>
							</v-row>
						</v-container>
					</v-main>
				</v-layout>
			</v-card>
		</v-navigation-drawer>
		<v-main>
			<v-container>
				<v-card class="mar-top" flat>
					<v-data-table :headers="headers" :items="desserts" :group-by="groupBy" item-value="name">
						<template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
							<tr>
								<td :colspan="columns.length">
									<VBtn
										size="small"
										variant="text"
										:icon="isGroupOpen(item) ? '$expand' : '$next'"
										@click="toggleGroup(item)"
									></VBtn>
									{{ item.value ? 'Contains gluten' : 'Gluten free' }}
								</td>
							</tr>
						</template>
					</v-data-table>
				</v-card>
			</v-container>
		</v-main>
		<v-divider></v-divider>
		<Footer />
	</v-app>
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import { useCartStore } from '../stores/cart';
</script>
<script>
export default {
	data: () => ({
		tab: null,
		drawer: false,
		groupBy: [
			{
				key: 'gluten',
				order: 'asc',
			},
		],
		headers: [
			{
				title: 'Dessert (100g serving)',
				align: 'start',
				sortable: false,
				key: 'name',
			},
			{ title: 'Calories', key: 'calories' },
			{ title: 'Fat (g)', key: 'fat' },
			{ title: 'Carbs (g)', key: 'carbs' },
			{ title: 'Protein (g)', key: 'protein' },
			{ title: 'Iron (%)', key: 'iron' },
		],
		desserts: [
			{
				name: 'Frozen Yogurt',
				calories: 159,
				fat: 6.0,
				carbs: 24,
				protein: 4.0,
				iron: '1%',
				gluten: false,
			},
			{
				name: 'Ice cream sandwich',
				calories: 237,
				fat: 9.0,
				carbs: 37,
				protein: 4.3,
				iron: '1%',
				gluten: false,
			},
			{
				name: 'Eclair',
				calories: 262,
				fat: 16.0,
				carbs: 23,
				protein: 6.0,
				iron: '7%',
				gluten: true,
			},
			{
				name: 'Cupcake',
				calories: 305,
				fat: 3.7,
				carbs: 67,
				protein: 4.3,
				iron: '8%',
				gluten: true,
			},
			{
				name: 'Gingerbread',
				calories: 356,
				fat: 16.0,
				carbs: 49,
				protein: 3.9,
				iron: '16%',
				gluten: true,
			},
			{
				name: 'Jelly bean',
				calories: 375,
				fat: 0.0,
				carbs: 94,
				protein: 0.0,
				iron: '0%',
				gluten: false,
			},
			{
				name: 'Lollipop',
				calories: 392,
				fat: 0.2,
				carbs: 98,
				protein: 0,
				iron: '2%',
				gluten: false,
			},
			{
				name: 'Honeycomb',
				calories: 408,
				fat: 3.2,
				carbs: 87,
				protein: 6.5,
				iron: '45%',
				gluten: true,
			},
			{
				name: 'Donut',
				calories: 452,
				fat: 25.0,
				carbs: 51,
				protein: 4.9,
				iron: '22%',
				gluten: true,
			},
			{
				name: 'KitKat',
				calories: 518,
				fat: 26.0,
				carbs: 65,
				protein: 7,
				iron: '6%',
				gluten: true,
			},
		],
	}),
	computed: {
		user() {
			const authStore = useAuthStore();
			return authStore.getUser;
		},
		cartItems() {
			const cartStore = useCartStore();
			return cartStore.getCartItems;
		},
	},
	methods: {
		toggleDrawer() {
			this.drawer = !this.drawer;
		},
		removeFromCart(id) {
			const cartStore = useCartStore();
			cartStore.removeFromCart(id);
		},
		decreaseQuantity(item) {
			if (item.quantity > 1) {
				item.quantity--;
			} else {
				this.removeFromCart(item.id);
			}
		},
		increaseQuantity(item) {
			item.quantity++;
		},
	},
};
</script>
<style scoped>
.mar-top {
	margin-top: 290px;
}
</style>
