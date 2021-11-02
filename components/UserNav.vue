<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{$auth.user.name}}　様
            </v-list-item-title>
            <v-list-item-subtitle>{{$auth.user.email}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-btn width="100%" color="error" class="text-subtitle" @click="logout" v-if="$auth.user">logout</v-btn>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >

<!-------------------- お店 -------------------->
    <v-list-group
        :value="true"
        prepend-icon="mdi-glass-mug"
      >
        <template v-slot:activator>
          <v-list-item-title>お店</v-list-item-title>
        </template>

        <v-list-item
          v-for="(shop, i) in shops"
          :key="i"
          link
          :to="shop.link"
        >

        <v-list-item-title v-text="shop.text" class="text-center"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="shop.icon"></v-icon>
          </v-list-item-icon>

        </v-list-item>
    </v-list-group>


    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 0,
      shops: [
        { text: 'サイト', icon: 'mdi-web', link: '/' },
        { text: 'メニュー', icon: 'mdi-silverware-variant' },
      ],
    }),
    methods: {
      logout() {
        this.$auth.logout()
        this.$emit('unShowCart')
      }
    },
  }
</script>