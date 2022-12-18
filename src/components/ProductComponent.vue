<template>
  <div class="row row-cols-3 g-3 my-3">
    <div class="col" v-for="product in sortProducts" :key="product.id">
      <CardComponent :product="product"></CardComponent>
    </div>
  </div>
</template>

<script>
import productsStore from "../stores/productsStore.js";
import cartStore from "../stores/cartStore.js";
import CardComponent from "./CardComponent.vue";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(productsStore, ["sortProducts"]),
  },
  methods: {
    ...mapActions(cartStore, ["addToCart"]),
  },
  components: {
    CardComponent,
  },
};
</script>
