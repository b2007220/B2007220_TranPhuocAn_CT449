<template>
	<v-row>
		<v-col cols="12" sm="4" v-for="(product, i) in products" :key="1">
			<v-card class="mx-auto" max-width="344">
				<v-img :src="product.img" height="200px" cover></v-img>
				<v-divider></v-divider>
				<v-card-title>
					{{ product.type }}
				</v-card-title>
				<v-card-actions>
					<v-btn>{{ product.money }}</v-btn>
					<v-spacer></v-spacer>
					<v-btn prepend-icon="mdi mdi-cart" @click="addToCart(product)">Mua</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useCartStore } from '../stores/cart';
export default {
	data: () => ({
		products: [
			{
				id: '1',
				img: ' 3.jpg',
				type: 'Bedroom',
				money: '450$',
				quantity: '1',
			},
			{
				img: '4.jpg',
				type: 'Furniture',
				money: '600$',
			},
			{
				img: '5.jpg',
				type: 'Home',
				money: '430$',
			},
			{
				img: '6.jpg',
				type: 'Interior',
				money: '303$',
			},
			{
				img: ' 7.jpg',
				type: 'Living room',
				money: '700$',
			},
			{
				img: '8.jpg',
				type: 'Living room',
				money: '360$',
			},
			{
				img: '9.jpg',
				type: 'Living room',
				money: '520$',
			},
			{
				img: '10.jpg',
				type: 'Living room',
				money: '360$',
			},
			{
				img: '2.jpg',
				type: 'Living room',
				money: '360$',
			},
		],
	}),
	methods: {
		addToCart(product) {
			const cartStore = useCartStore();
			cartStore.addToCart(product);
		},
	},
};
</script>
<style scoped></style>
