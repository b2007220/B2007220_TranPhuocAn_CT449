<template>
	<v-dialog width="500">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" prepend-icon="mdi mdi-account">Đăng nhập</v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card title="Đăng nhập">
				<v-spacer></v-spacer>
				<v-sheet width="400" class="mx-auto mt-5">
					<v-form @submit="handleSubmit" ref="form">
						<v-text-field
							v-model="username"
							:rules="rules"
							variant="outlined"
							label="Tên đăng nhập"
						></v-text-field>
						<v-spacer></v-spacer>
						<v-text-field
							v-model="password"
							type="password"
							:rules="rules"
							variant="outlined"
							label="Mật khẩu"
						></v-text-field>
						<v-btn type="submit" variant="outlined" block class="mt-2">Đăng nhập</v-btn>
					</v-form>
					<v-btn
						block
						class="mt-5"
						variant="outlined"
						prepend-icon="mdi mdi-google"
						@click="handleSubmitGoogle"
						>Đăng nhập với google</v-btn
					>
				</v-sheet>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text="Đóng" @click="isActive.value = false"></v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';
import { auth } from '../firebase';
import { useAuthStore } from '../stores';

export default {
	data() {
		return {
			username: '',
			password: '',
			rules: [
				(value) => !!value || 'Vui lòng nhập trường này',
				(value) => (value && value.length >= 6) || 'Tên đăng nhập phải có ít nhất 6 ký tự',
			],
		};
	},
	methods: {
		async handleSubmit() {
			try {
				if (await this.$refs.form.validate()) {
					const res = await authService.login({
						username: this.username,
						password: this.password,
					});

					tokenService.setToken(res.token);

					const profile = await authService.getUserProfile();

					const authStore = useAuthStore();

					authStore.setUser(profile);

					console.log(profile);
				}
			} catch (error) {
				console.log(error);
			}
		},

		async handleSubmitGoogle() {
			try {
				const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

				const idToken = await user.getIdToken();

				const res = await authService.signInWithIdToken(idToken);

				tokenService.setToken(res.token);

				const profile = await authService.getUserProfile();

				const authStore = useAuthStore();

				authStore.setUser(profile);

				console.log(profile);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
