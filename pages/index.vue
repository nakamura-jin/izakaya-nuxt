<template>
  <v-container>
    <v-row>
      <v-tabs show-arrows fixed-tabs>
        <v-tab class="text-caption" @click="selectMenu(0)">All Food</v-tab>
        <v-tab class="text-caption" @click="selectMenu(1)">Meat</v-tab>
        <v-tab class="text-caption" @click="selectMenu(3)">Vegetable</v-tab>
        <v-tab class="text-caption" @click="selectMenu(4)">Rice</v-tab>
      </v-tabs>
  </v-row>
    <v-row>
      <v-col class="pa-2 pa-0 px-md-8 d-sm-flex flex-wrap">
        <v-card v-for="item in menu" :key="item.id" class="ma-3" max-width="340px">
          <v-col class="mx-auto">
            <v-img :src="item.image" height="160">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-card-title class="pt-0 pb-1 text-subtitle-1 font-weight-black">{{ item.title }}</v-card-title>
          <v-col class="pa-0">
            <v-card-text class="short pt-0" style="height:60px">{{ item.discription }}</v-card-text>
          </v-col>
          <v-col class="d-flex pt-0">
            <v-chip class="text-subtitle-h6" color="cyan" light># {{ item.tag_name }}</v-chip>
            <v-spacer></v-spacer>
            <!-- <v-chip class="px-4 text-subtitle-h6" label color="warning" style="color: black">¥ {{ item.price }} </v-chip> -->
            <p class="text-h6 mb-0">¥ {{ item.price }}</p>
          </v-col>
          <v-col class="ml-auto d-flex pt-0">
            <v-col class="pa-0 d-flex pt-1">
              <div class="pt-2">
                <span class="mr-2">数量: </span>
                <SelectQuantity :Item = item />
              </div>
                <v-spacer></v-spacer>
                <CardButton
                  v-if="$auth.user"
                  :MenuId = item.id
                  :Title = item.titel
                  :Item = item
                />
                <v-btn v-else @click.stop="dialog = true" color="error"><v-icon small>mdi-cart</v-icon>カートに追加</v-btn>
            </v-col>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
      <v-dialog v-model="dialog" max-width="500">
        <PromptLogin @closeDialog="dialog = false"/>
      </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data(){
      return {
        allQuantity: [1, 2, 3, 4, 5],
        selected: 1,
        dialog: false,
        alert: true,
        selectTag: ''
      }
    },
    methods: {
      selectQuantity(id) {
        const data = {
          id,
          quantity: this.selected
        }
        this.$store.commit('SELECT_QUANTITY', data);
      },
      goToLogin() {
        this.$router.push('/auth.login')
      },
      selectMenu(tag) {
        if(tag != 0) {
          this.$store.dispatch('selectMenu', tag)
        } else {
          this.$store.dispatch('getMenu');
        }
      }
    },
    computed: {
      menu() {
        return this.$store.state.menu
      },
    },
    mounted() {
      this.$store.dispatch('getMenu');
      if(this.$auth.user) {
        this.$store.dispatch('getCartItems', { user_id: this.$auth.user.id});
      }
    },
  }

</script>
