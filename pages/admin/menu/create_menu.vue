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
    <v-col>
      <h1 class="text-center text-h6 text-md-h4 mb-md-8">メニュー作成</h1>
    </v-col>
    <CreateMenu />
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  methods: {
    back(){
      this.$router.push('/admin/menu/')
    }
  }
}
</script>

<style>

</style>