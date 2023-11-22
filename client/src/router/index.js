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
				path: '/order',
				name: 'Order',
				component: () => import('../views/OrderPage.vue'),
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('../views/Profile.vue'),
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
				component: () => import('../views/AdminAccount.vue'),
			},
			{
				path: 'product',
				name: 'AdminProduct',
				component: () => import('../views/AdminProduct.vue'),
			},
			{
				path: 'product/picture',
				name: 'AdminProductPicture',
				component: () => import('../views/AdminProductPicture.vue'),
			},
			{
				path: 'order',
				name: 'AdminOrder',
				component: () => import('../views/AdminOrder.vue'),
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
