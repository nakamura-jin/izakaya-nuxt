<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <v-card height="300" width="400">
        <v-row class="text-center mt-16">
          <v-card-text class="text-md-h5">登録ありがとうございます</v-card-text>
          <v-col class="d-flex mt-8 mx-10 mx-md-16">
            <v-btn color="success" @click="login">ログイン</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="top">トップページ</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/auth/login')
    },
    top() {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>