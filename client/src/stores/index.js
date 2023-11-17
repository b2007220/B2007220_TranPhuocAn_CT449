import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
	}),
	actions: {
		setUser(user) {
			this.user = user;
			localStorage.setItem('authStore', JSON.stringify(this.$state));
		},
		logout() {
			this.user = null;
			localStorage.removeItem('authStore');
		},
	},
	getters: {
		getUser() {
			return this.user;
		},
	},
});
