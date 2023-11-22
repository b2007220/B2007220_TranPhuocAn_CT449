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
					<v-row>
						<v-col cols="12" sm="7">
							<v-form @submit.prevent="updateUser">
								<v-text-field v-model="user.fullName" label="Họ tên" required></v-text-field>

								<v-text-field v-model="user.username" label="Gmail" disabled></v-text-field>

								<v-text-field v-model="user.phone" label="Số điện thoại" required></v-text-field>

								<v-text-field v-model="user.address" label="Địa chỉ" required></v-text-field>
								<v-btn class="me-4" type="submit" color="#806044"> Xác nhận </v-btn>
							</v-form>
						</v-col>
						<v-col cols="12" sm="5">
							<v-template v-if="!isSetPassword">
								<v-form @submit.prevent="createPassword">
									<v-text-field v-model="user.password" label="Mật khẩu" required></v-text-field>
									<v-text-field
										v-model="user.passwordConfirm"
										label="Nhập lại mật khẩu"
										required
									></v-text-field>
									<v-btn class="me-4" type="submit" color="#806044">Tạo mật khẩu</v-btn>
								</v-form>
							</v-template>
							<v-template v-else>
								<v-form @submit.prevent="updatePassword">
									<v-text-field
										v-model="user.oldPassword"
										label="Mật khẩu cũ"
										required
									></v-text-field>
									<v-text-field
										v-model="user.updatePassword"
										label="Mật khẩu mới"
										required
									></v-text-field>
									<v-text-field
										v-model="user.updatePasswordConfirm"
										label="Nhập lại mật khẩu mới"
										required
									></v-text-field>
									<v-btn class="me-4" type="submit" color="#806044">Đổi mật khẩu</v-btn>
								</v-form>
							</v-template>
						</v-col>
					</v-row>
				</v-card>
			</v-container>
		</v-main>
		<v-divider></v-divider>
		<Footer />
	</v-app>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/';
import accountService from '../services/account.service';
export default {
	components: {
		NavBar,
		Footer,
	},
	setup() {
		const authStore = useAuthStore();
		const user = reactive({
			fullName: authStore.getUser.fullName || '',
			username: authStore.getUser.username || '',
			phone: authStore.getUser.phone || '',
			address: authStore.getUser.address || '',
			password: '',
			isSetPassword: authStore.getUser.password ? true : false,
			passwordConfirm: '',
			oldPassword: '',
		});

		const updateUser = async () => {
			try {
				const updateUser = await accountService.update(user);
				authStore.setUser(updateUser);
				alert('Cập nhật thành công');
			} catch (error) {
				console.error('Error updating profile:', error.message);
			}
		};
		const createPassword = async () => {
			try {
				if (user.password !== user.passwordConfirm) {
					alert('Mật khẩu không khớp');
					return;
				}
				const updateUser = await accountService.updatePassword({ password: user.password });
				authStore.setUser(updateUser);
				alert('Cập nhật thành công');
			} catch (error) {
				console.error('Error updating profile:', error.message);
			}
		};
		const updatePassword = async () => {
			try {
				if (user.updatePassword !== user.updatePasswordConfirm) {
					alert('Mật khẩu không khớp');
					return;
				}
				if (user.oldPassword !== authStore.getUser.password) {
					alert('Mật khẩu cũ không đúng');
					return;
				}
				const updateUser = await accountService.updatePassword(updatePassword);
				authStore.setUser(updateUser);
				alert('Cập nhật thành công');
			} catch (error) {
				console.error('Error updating profile:', error.message);
			}
		};
		return {
			user,
			updateUser,
			createPassword,
			updatePassword,
		};
	},
	data() {
		return {
			tab: null,
			drawer: false,
		};
	},
	computed: {
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
