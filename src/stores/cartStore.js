import { defineStore } from "pinia";
import productsStore from "../stores/productsStore.js";

export default defineStore("cart", {
  // methods
  // actions
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(productId, num = 1) {
      const currentCart = this.cart.find(
        (item) => item.productId === productId
      );
      if (currentCart) {
        currentCart.num++; // 若購物車已有商品直接增加數量
      } else {
        this.cart.push({
          id: new Date().getTime(),
          productId,
          num,
        });
      }
    },
    setCartNum(id, event) {
      const currentCart = this.cart.find((item) => item.id === id);
      currentCart.num = event.target.value * 1;
    },
    removeCartItem(id) {
      const index = this.cart.findIndex((item) => item.id === id);
      this.cart.splice(index, 1);
    },
  },
  getters: {
    cartList: ({ cart }) => {
      // 1. 購物車品項資訊，透過整合產品資訊完成
      // 2. 計算小計金額
      // 3. 提供總金額
      const { products } = productsStore();
      const carts = cart.map((item) => {
        const product = products.find(
          (product) => product.id === item.productId
        );
        return {
          ...item, // 購物車列表
          product, // 單一產品資訊
          subtotal: product.price * item.num,
        };
      });
      const total = carts.reduce((a, b) => a + b.subtotal, 0);

      return {
        carts, // 列表
        total, // 總金額
      };
    },
  },
});
