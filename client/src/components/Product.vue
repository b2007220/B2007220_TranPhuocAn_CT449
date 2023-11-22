<template>
	<v-row>
		<v-col cols="12" sm="4" v-for="(product, i) in products" :key="product.id">
			<v-card class="mx-auto" max-width="344">
				<v-img
					v-if="product.productPictures.length > 0"
					:src="product.productPictures[0].url"
					height="200px"
					cover
				></v-img>
				<v-img
					v-else
					src="https://t4.ftcdn.net/jpg/05/41/46/75/360_F_541467587_GfiiQ3H085d1BSLzqODWCG5EoVK3z6cy.jpg"
					height="200px"
					cover
				></v-img>
				<v-divider></v-divider>
				<v-card-title>
					{{ product.name }}
				</v-card-title>
				<v-card-actions>
					<v-btn>{{ product.price }}</v-btn>
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
		tab: 1,
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
			console.log(newTab);
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
