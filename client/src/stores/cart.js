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
    },
    removeFromCart(productId) {
      if (!this.cartItems) {
        return;
      }
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
    },
    updateCartItem({ productId, quantity }) {
      if (!this.cartItems) {
        return;
      }
      const productIndex = this.cartItems.findIndex(item => item.id === productId);
      if (productIndex !== -1) {
        this.cartItems[productIndex].quantity = quantity;
      }
    },
  },
  getters: {
    getCartItems() {
      return this.cartItems;
    },
  },
});
