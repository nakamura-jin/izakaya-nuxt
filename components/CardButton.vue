<template>
  <div>
    <v-btn v-if="addedCart" color="primary" disabled><v-icon small>mdi-cart</v-icon>追加済み</v-btn>
    <v-btn v-else color="error" @click="addToCart"><v-icon small>mdi-cart</v-icon>カートに追加</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    Item: Object,
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addMenuToCart', {
        user_id: this.$auth.user.id,
        menu_id: this.Item.id,
        quantity: this.Item.quantity,
        title: this.Item.title
      })
    },
  },
  computed: {
    addedCart(){
      let cart = this.$store.state.cart.some(item => {
        return item.menu_id === this.Item.id
      })
      if(cart) {
        return true
      } else {
        return false
      }　　　　　　
    }
  },
}
</script>

<style>

</style>