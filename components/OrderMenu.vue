<template>
  <div class="container pa-0">
    <ul v-for="item in list" :key="item.id">
      <div class="pa-0 d-flex">
        <li class="px-0 py-2" style="list-style: none;">{{ item.title }}</li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Order: Array,
  },
  data() {
    return {
      order_menu: this.Order,
    }
  },
  computed: {
    list() {
      return this.order_menu
    }
  }
}
</script>

<style>

</style>