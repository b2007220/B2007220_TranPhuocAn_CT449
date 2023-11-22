import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartItems: [],
	}),
	actions: {
		addToCart(product) {
			if (!this.cartItems) {
				this.cartItems = [];
			}
			this.cartItems.push(product);
			this.saveCartToLocalStorage();
		},
		removeFromCart(productId) {
			if (!this.cartItems) {
				return;
			}
			this.cartItems = this.cartItems.filter((item) => item.id !== productId);
			this.saveCartToLocalStorage();
		},
		updateCartItem({ productId, quantity }) {
			if (!this.cartItems) {
				return;
			}
			const productIndex = this.cartItems.findIndex((item) => item.id === productId);
			if (productIndex !== -1) {
				this.cartItems[productIndex].quantity = quantity;
				this.saveCartToLocalStorage();
			}
		},
		saveCartToLocalStorage() {
			localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
		},
		loadCartFromLocalStorage() {
			const storedCart = localStorage.getItem('cartItems');
			if (storedCart) {
				this.cartItems = JSON.parse(storedCart);
			}
		},
		clearCart() {
			this.cartItems = [];
			this.saveCartToLocalStorage();
		},
	},
	getters: {
		getCartItems() {
			return this.cartItems;
		},
	},
});
