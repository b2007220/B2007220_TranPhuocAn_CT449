import { createWebHistory, createRouter } from 'vue-router';
const routes = [
	{
		path: '/',
		component: () => import('../layouts/default/Default.vue'),
		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('../views/Home.vue'),
			},
			{
				path: '/product',
				name: 'Details',
				component: () => import('../views/ProductDetail.vue'),
			},
		],
	},
	{
		path: '/admin',
		component: () => import('../layouts/default/Default.vue'),
		children: [
			{
				path: '',
				name: 'Admin',
				component: () => import('../views/AdminPage.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notfound',
		component: () => import('../views/NotFound.vue'),
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
