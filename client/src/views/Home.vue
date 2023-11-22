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
									<h3 class="text-h5" >
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
					<v-tabs v-model="tab" color="#6A6F4C" align-tabs="center">
						<v-tab :value="1">Mới nhất</v-tab>
						<v-tab :value="2">Giá thấp đến cao</v-tab>
						<v-tab :value="3">Giá cao đến thấp</v-tab>
					</v-tabs>
					<v-window v-model="tab">
						<v-window-item v-for="n in 3" :key="n" :value="n">
							<v-container fluid>
								<Product />
							</v-container>
						</v-window-item>
					</v-window>
				</v-card>
			</v-container>
		</v-main>
		<v-divider></v-divider>
		<Footer />
	</v-app>
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
import Product from '../components/Product.vue';
import Footer from '../components/Footer.vue';
import { useCartStore } from '../stores/cart';
</script>
<script>
export default {
	data: () => ({
		tab: null,
		drawer: false,
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
