import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from './plugins';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './style.css';
import { useCartStore } from './stores/cart';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores';

const vuetify = createVuetify({
	components,
	directives,
});

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);

const persistedState = localStorage.getItem('authStore');
if (persistedState) {
	useAuthStore().$state = JSON.parse(persistedState);
}

const cartStore = useCartStore();
cartStore.loadCartFromLocalStorage();

app.use(vuetify);
registerPlugins(app);
app.mount('#app');
