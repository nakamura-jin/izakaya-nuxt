<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="error"
    >
      <!-- 未ログインユーザー用 -->
      <div v-if="$auth.user == null || $auth.user == false">
        <AllUserNav />
      </div>

      <!-- オーナー -->
      <div v-if="$auth.user != null && $auth.user.role_id == 1">
        <AdminNav />
      </div>

      <!-- メンバー -->
      <div v-if="$auth.user != null && $auth.user.role_id == 2">
        <MemberNav />
      </div>

      <!-- メンバー -->
      <div v-if="$auth.user != null && $auth.user.role_id == 3">
        <UserNav />
      </div>

      <v-bottom-navigation absolute>
        <v-btn><v-icon color="blue">mdi-facebook</v-icon></v-btn>
        <v-btn><v-icon>mdi-instagram</v-icon></v-btn>
      </v-bottom-navigation>


    </v-navigation-drawer>

    <v-app-bar app color="error" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>


      <v-btn icon @click="goToCart">
          <v-icon>mdi-cart</v-icon>
        <v-badge offset-y="-2" offset-x="14" :content="cartItemCount" :value="cartItemCount">
        </v-badge>
      </v-btn>

    </v-app-bar>

    <v-main>
      <!--  -->
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        drawer: null,
      }
    },
    methods: {
      goToCart() {
        this.$router.push('/cart')
      },
    },
    computed: {
      ...mapGetters(['cartItemCount'])
    }
  }
</script>
