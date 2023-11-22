<template>
	<v-row>
		<v-col cols="12" sm="4" v-for="(product, i) in products" :key="1">
			<v-card class="mx-auto" max-width="344">
				<router-link :to="{ name: 'product', params: { id: product.id } }">
					<v-img :src="product.img" height="200px" cover></v-img>
				</router-link>
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

<script setup>
import { useCartStore } from '../stores/cart';
import productService from '../services/product.service';

</script>
<script>
export default {
	data: () => ({
		products: [],
		sortBy: null,
	}),
	async created() {
		try {
			this.sortProducts();
		} catch (error) {
			console.error(error);
		}
	},
	watch: {
		tab(newTab) {
			this.sortProducts();
		},
	},
	methods: {
		async addToCart(product) {
			const cartStore = useCartStore();
			cartStore.addToCart(product);
		},
		async sortProducts() {
			switch (this.tab) {
				case 1:
					this.products = await productService.getAll();
					break;
				case 2:
					this.products = await productService.getProductsByPriceAsc();
					break;
				case 3:
					this.products = await productService.getProductsByPriceDesc();
					break;
				default:
					this.products = await productService.getAll();
					break;
			}
		},
	},
};
</script>
<style scoped></style>
