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
							<v-img style="background-color: #4f493f"></v-img>
						</template>
						<v-app-bar-title>Giỏ hàng</v-app-bar-title>
						<v-spacer></v-spacer>
					</v-app-bar>
					<v-main>
						<v-container fluid>
							<v-row dense>
								<v-col cols="12" v-for="product in cartItems" :key="product.id">
									<v-card color="#908471" theme="dark">
										<div class="d-flex flex-no-wrap justify-space-between">
											<div>
												<v-card-title class="text-h5"> {{ product.name }} </v-card-title>
												<v-card-subtitle>{{ product.price }}</v-card-subtitle>
												<v-card-actions>
													<v-text-field
														v-model="product.stock"
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
														@click="decreaseQuantity(product)"
													></v-btn>
													<v-btn
														icon="mdi mdi-menu-right"
														size="small"
														@click="increaseQuantity(product)"
													></v-btn>
													<v-btn @click="removeFromCart(product.id)" size="small">Xóa</v-btn>
												</v-card-actions>
											</div>
											<v-avatar class="ma-3" size="100" rounded="0">
												<v-img
													v-if="product.productPictures.length > 0"
													:src="product.productPictures[0].url"
													cover
												></v-img>
												<v-img
													v-else
													src="https://t4.ftcdn.net/jpg/05/41/46/75/360_F_541467587_GfiiQ3H085d1BSLzqODWCG5EoVK3z6cy.jpg"
													cover
												></v-img>
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
												(total, product) =>
													total + parseFloat(product.price) * parseInt(product.stock),
												0,
											)
										}}$
									</h3>
								</v-col>
								<v-col cols="12" sm="12" class="d-flex justify-center align-center">
									<v-divider></v-divider>
								</v-col>
								<v-col cols="12" sm="12" class="d-flex justify-center align-center">
									<v-btn rounded="xl" @click="createOrder">Thanh toán</v-btn>
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
					<v-data-table-server
						v-model:items-per-page="itemsPerPage"
						:headers="headers"
						:items-length="totalItems"
						:items="transformedData"
						:loading="loading"
						item-value="name"
						@update:options="loadItems"
					></v-data-table-server>
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
import orderService from '../services/order.service';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/';
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
const orders = await orderService.findAllByCustomer();
export default {
	data: () => ({
		tab: null,
		drawer: false,
		itemsPerPage: 5,
		headers: [
			{ title: 'Tên sản phẩm', key: 'productDetails', align: 'end' },
			{ title: 'Giá', key: 'total', align: 'end' },
			{ title: 'Ngày đặt hàng', key: 'orderDate', align: 'end' },
			{ title: 'Trạng thái', key: 'status', align: 'end' },
		],
		serverItems: [],
		loading: true,
		totalItems: 0,
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

		transformedData() {
			return orders.map((item) => {
				const productDetailsString = item.orderDetails
					.map((orderDetail) => `Sản phẩm: ${orderDetail.product.name}, Số lượng: ${orderDetail.quantity}`)
					.join(', ');

				return {
					...item,
					productDetails: productDetailsString,
				};
			});
		},
	},
	methods: {
		loadItems({ page, itemsPerPage, sortBy }) {
			this.loading = true;
			FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
				this.serverItems = items;
				this.totalItems = total;
				this.loading = false;
			});
		},
		toggleDrawer() {
			this.drawer = !this.drawer;
		},
		removeFromCart(id) {
			const cartStore = useCartStore();
			cartStore.removeFromCart(id);
		},
		decreaseQuantity(product) {
			if (product.stock > 1) {
				product.stock--;
			} else {
				this.removeFromCart(item.id);
			}
		},
		increaseQuantity(product) {
			product.stock++;
		},
		async createOrder() {
			const cartStore = useCartStore();
			if (!this.user) {
				alert('Vui lòng đăng nhập');
				return;
			}
			if (cartStore.getCartItems.length === 0) {
				alert('Giỏ hàng trống');
				return;
			}
			if (!this.user.address || !this.user.phone) {
				alert('Vui lòng cập nhật địa chỉ và số điện thoại');
				return;
			}
			const order = {
				products: cartStore.getCartItems,
				total: cartStore.getCartItems.reduce(
					(total, product) => total + parseFloat(product.price) * parseInt(product.stock),
					0,
				),
			};
			const payment = await orderService.makePayment(order);
			cartStore.clearCart();
			alert('Thanh toán thành công!');
		},
	},
};
</script>
<style scoped>
.mar-top {
	margin-top: 290px;
}
</style>
