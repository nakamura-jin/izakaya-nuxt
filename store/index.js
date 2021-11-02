import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const state = () => ({
  menu: [],
  cart: [],
  order: [],
  editOrder: [],
  editFoodQuantity: []
})


export const getters = {
  cartItemCount: state => {
    return state.cart.length
  },

  totalCartPrice: state => {

    let total = 0
    state.cart.forEach(item => {
      total += item.menu_price * item.quantity
    });

    return total * 1.1
  }

}


export const mutations = {
  SET_MENU(state, menu) {
    state.menu = menu
  },

  ADD_TO_CART(state, { user_id, menu_id, quantity }) {

    let menuInCart = state.cart.find(item => {
      return item.menu_id === menu_id
    });

    if (menuInCart) {
      menuInCart.quantity += quantity;
      return
    }
    state.cart.push({
      user_id,
      menu_id,
      quantity,
    });
  },


  SET_CART(state, cartItem) {
    state.cart = cartItem;
  },

  REMOVE_FROM_CART(state, cart_id) {
    state.cart = state.cart.filter(item => {
      return item.id !== cart_id
    })
  },

  SET_QUANTITY(state) {
    state.menu.forEach(element => {
      return element.quantity = 1
    });
  },

  SELECT_QUANTITY(state, data) {
    state.menu.forEach(el => {
      if (el.id === data.id) {
        el.quantity = data.quantity
      }
    })
  },

  CHECK_OUT(state, {user_id, menu_list, date, time}) {
    state.cart = state.cart.filter(el => {
      return el.id !== user_id
    })
  },

  SET_ORDER(state, data) {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let day = ("0" + (date.getDate())).slice(-2)
    let today = year + '-' + month + '-' + day


    state.order = data.filter(item => {
      return item.display == 1 && item.date == today;
    });


  },

  CHENCG_COOKED(state, { id, cooked }) {
    state.order.forEach(el => {
      if (el.id == id) {
        el.cooked = cooked
      }
    })
  },

  SELECT_MENU(state, tag) {
    state.menu = tag;
  },

  SHOP_EDIT_ORDER(state, shopEditOrder) {
    state.editOrder = shopEditOrder;
  },

  SET_EDIT_MENU_LIST(state, setList) {
    return state.editFoodQuantity = setList
  },

  EDIT_FOOD_QUANTITY(state, data) {
    state.editFoodQuantity.forEach(item => {
      if (item.id == data.id) {
        item.quantity = data.quantity
      }
    })
  },

  DELETE_ORDER_FOOD(state, { data, id, menu_id }) {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let day = ("0" + (date.getDate())).slice(-2)
    let today = year + '-' + month + '-' + day

    let setDate = ''
    data.forEach(item => {
      if(item.id == id) {
        setDate =  item.date
      }
    })

    let editOrder = [];
    state.order.forEach(item => {
      if (item.id == id) {
        item.menu_list.forEach(el => {
          if (el.id !== menu_id) {
            editOrder.push(el)
          }
        })
      }
    })

    state.order = state.order.forEach(item => {
      if (item.id == id) {
        item.menu_list = editOrder
      }
    })
  }
}





export const actions = {

  async getMenu({ commit }) {
    await this.$axios.$get('/api/menu')
      .then(res => {
        commit('SET_MENU', res.data);
        commit('SET_QUANTITY');
    })
  },

  async addMenuToCart({ commit }, {user_id, menu_id, quantity}) {
    await this.$axios.$post('/api/cart', {
      user_id: user_id,
      menu_id: menu_id,
      quantity: quantity
    })
    commit('ADD_TO_CART', {user_id, menu_id, quantity} )
  },

  async getCartItems({ commit }, {user_id}) {
    await this.$axios.$get('/api/' + user_id + '/cart')
      .then(res => {
        commit('SET_CART', res.data);
      })
  },

  async removeCart({ commit }, { cart_id }) {
    commit('REMOVE_FROM_CART', cart_id);
    await this.$axios.$delete('/api/cart/' + cart_id)
  },

  async checkOut({ commit }, { user_id, menu_list, date, time }) {
  //   commit('CHECK_OUT', { user_id, menu_list, date, time});

    await this.$axios.$post('/api/' + user_id + '/order', {
      user_id: user_id,
      menu_list: menu_list,
      date: date,
      time: time
    })
    .then(() => {
      this.$axios.$delete('/api/' + user_id + '/cart')
      commit('CHECK_OUT', { user_id, menu_list, date, time});
    })
  },

  // async checkOut({ commit }, orderData) {
  //   await this.$axios.$post('/api/' + this.$auth.user.id + '/order', {
  //     orderData
  //   })
    // commit('CHECK_OUT', { orderData });
    // commit('TEST', res.data);
  //   this.$axios.$get('/api/order')
  //     .then((res) => {
  //       commit('TEST', res.data);
  //   })
  // },

  async getOrder({ commit }) {
    await this.$axios.$get('/api/order')
      .then((res) => {
        commit('SET_ORDER', res.data);
    })
  },

  async cooked({ commit }, {id, cooked}) {
    await this.$axios.$put('/api/order/cooked/' + id,
      { cooked: cooked }
    ).then(
      commit('CHENCG_COOKED', { id, cooked })
    )
  },

  async selectMenu({ commit }, tag) {
    await this.$axios.$get('/api/menu/tag/' + tag)
      .then(res => {
      commit('SELECT_MENU', res.data)
    })
  },

  async editOrder({ commit }, id) {
    await this.$axios.$get('/api/order/' + id)
      .then((res) => {
        commit('SHOP_EDIT_ORDER', res.data);
    })
  },

  async editShopOrder({ dispatch }, { id, user_id, menu_list, display, date, time }) {
    await this.$axios.$put('/api/order/' + id, {
      user_id: user_id,
      menu_list: menu_list,
      display: display,
      date: date,
      time: time
    })
    dispatch('getOrder')
  },

  async orderMenuListDelete({ dispatch, commit }, { id, menu_id, quantity }) {
    await this.$axios.$put('/api/order/list/' + id, {
      id: id,
      menu_id: menu_id,
      quantity: quantity
    })
    this.$axios.$get('/api/order')
      .then(res => {
        let data = res.data
        commit('DELETE_ORDER_FOOD', { data, id, menu_id })
        dispatch('getOrder')
    })
  }

}