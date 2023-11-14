import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from './plugins'

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './style.css';

import { createPinia } from 'pinia'

const vuetify = createVuetify({
	components,
	directives,
})

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(vuetify)
registerPlugins(app)
app.mount('#app')