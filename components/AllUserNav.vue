<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item>
          <v-icon>mdi-dots-horizontal</v-icon>

          <v-list-item-content class="ml-8">
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn width="100%" color="error" class="text-subtitle" @click="logout" v-if="$auth.user">logout</v-btn>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'ホーム', icon: 'mdi-home', link: '/' },
        { text: 'ユーザー登録', icon: 'mdi-account-plus', link: '/auth/register' },
        { text: 'ログイン', icon: 'mdi-account', link: '/auth/login' },
      ],
    }),
    methods: {
      logout() {
        this.$auth.logout()
      }
    }
  }
</script>