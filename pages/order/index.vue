<template>
  <v-container>

        <h1 class="mb-6 text-center mx-auto">注文一覧</h1>
        <v-col class="pa-0 ma-0" v-if="alert">
          <DeleteAlert />
        </v-col>

    <v-simple-table class="pa-0">
      <template>
        <thead>
          <tr>
            <th class="text-center" width="12%">
              調理済み
            </th>
            <th class="text-center">
              受取時間
            </th>
            <th class="text-center" width="12%">
              お客様名
            </th>
            <th class="text-center" width="28%">
              料理名
            </th>
            <th class="text-center" width="10%">
              数量
            </th>
            <th class="text-center" width="12%">
              料金
            </th>
            <th class="text-center" width="6%">
              編集
            </th>
            <th class="text-center" width="6%">
              削除
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in order"
            :key="item.id"
          >
            <!-- 調理状況 -->
            <td class="text-center">
              <OrderCooked :order="item" />
            </td>

            <!-- 受取時間 -->
            <td v-if="item.cooked == 0" style="color: #555" class="text-center">
              {{ item.time}}
            </td>
            <td v-else class="text-center">
              {{ item.time }}
            </td>

            <!-- お客様名 -->
            <td v-if="item.cooked == 0" style="color: #555" class="text-center">
              {{ item.user_name }}
            </td>
            <td v-else class="text-center">
              {{ item.user_name }}
            </td>

            <!-- 料理名 -->
            <td v-if="item.cooked == 0" style="color: #555">
              <OrderMenu :Order="item.menu_list" />
            </td>
            <td v-else>
              <OrderMenu :Order="item.menu_list" />
            </td>

            <!-- 数量 -->
            <td v-if="item.cooked == 0" style="color: #555" class="text-center">
              <OrderQuantity :Order="item.menu_list"/>
            </td>
            <td v-else class="text-center">
              <OrderQuantity :Order="item.menu_list"/>
            </td>

            <!-- 合計 -->
            <td v-if="item.cooked == 0" style="color: #555" class="text-center">
              ¥ {{ item.total_price | priceLocaleString }}
            </td>
            <td v-else class="text-center">
              ¥ {{ item.total_price | priceLocaleString }}
            </td>

            <!-- 編集 -->
            <td class="text-center"><v-btn icon color="success" :disabled="item.cooked == 0" @click="shopOrderEdit(item)"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
            <!-- 削除 -->
            <td class="text-center"><v-btn icon color="error" :disabled="item.cooked == 0" @click="shopOrderDelete(item)"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="editOrder" max-width="500">
      <ShopEditOrder
        :Order="editOrderMenu"
        v-if="editOrder"
        @closeEditOrder="editOrder = false"
        @updateOrder="editOrder= false"
        @shopEditOrder="editOrder = false, alert = false" />
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      editOrder: false,
      alert: false,
      editOrderMenu: '',
      totalPrice: ''
    }
  },
  computed: {
    order() {
      return this.$store.state.order
    },
    shopEditOrder() {
      return this.$store.state.editOrder
    }
  },
  mounted() {
    this.$store.dispatch('getOrder')

    this.$echo.channel('test-izakaya')
      .listen('OrderCreated', (e) => {
        this.$store.dispatch('getOrder')
        // console.log(e)
      });
  },

  filters: {
    priceLocaleString(value) {
      return value.toLocaleString();
    },
  },
  methods: {
    shopOrderEdit(item) {
      // this.$store.commit('SET_EDIT_MENU_LIST', {id: item})

      let setList = [];
      item.menu_list.forEach(el => {
        setList.push({id: el.id, quantity: el.quantity})
      })

      this.$store.commit('SET_EDIT_MENU_LIST', setList)

      this.editOrderMenu = item
      this.editOrder = true

    },
    shopOrderDelete(item) {
      let orderDelete = confirm('本当に削除してもよろしいですか？');
      if(orderDelete) {
        let itemMenuList = [];
        item.menu_list.forEach(value => {
          itemMenuList.push({id: value.id, quantity: value.quantity})
        })
        this.$store.dispatch('editShopOrder', {
          id: item.id,
          user_id: item.user_id,
          menu_list: itemMenuList,
          display: 0,
          date: item.date,
          time: item.time
        })
      }
    }
  },
}
</script>

<style>

</style>