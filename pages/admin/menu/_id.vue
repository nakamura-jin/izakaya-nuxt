<template>
  <v-container>
    <v-row>
      <v-col class="pb-0">
        <v-btn
          icon
          color="error"
          class="ml-3"
          @click="back"
        >
        <v-icon>mdi-arrow-left</v-icon>
        戻る
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <h1 class="pt-0 pb-2 pb-sm-8 text-h5 text-sm-h4 text-center font-weight-black">メニュー編集</h1>
        <EditMenu />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push('/admin/menu')
    }
  }
}
</script>

<style>

</style>