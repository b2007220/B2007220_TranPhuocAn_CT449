<template>
	<v-dialog width="500">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" prepend-icon="mdi mdi-account">Login</v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card title="Đăng nhập">
				<v-spacer></v-spacer>
				<v-sheet width="400" class="mx-auto mt-5">
					<v-form @submit.prevent>
						<v-text-field v-model="username" :rules="rules" label="Tên đăng nhập"></v-text-field>
						<v-text-field v-model="password" :rules="rules" label="Mật khẩu"></v-text-field>
						<v-btn type="submit" block class="mt-2">Đăng nhập</v-btn>
					</v-form>
					<v-btn block class="mt-5" prepend-icon="mdi mdi-google" @click="handleButtonClick"
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
export default {
	methods: {
		async handleButtonClick() {
			try {
				const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

				const idToken = await user.getIdToken();

				const res = await authService.signInWithIdToken(idToken);

				tokenService.setToken(res.token);

				const profile = await authService.getUserProfile();

				console.log(profile);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
