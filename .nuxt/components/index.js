export { default as AdminNav } from '../../components/AdminNav.vue'
export { default as AllUserNav } from '../../components/AllUserNav.vue'
export { default as CardButton } from '../../components/CardButton.vue'
export { default as CreateMenu } from '../../components/CreateMenu.vue'
export { default as DeleteAlert } from '../../components/DeleteAlert.vue'
export { default as EditMenu } from '../../components/EditMenu.vue'
export { default as EditOrderFoodQuantity } from '../../components/EditOrderFoodQuantity.vue'
export { default as MemberList } from '../../components/MemberList.vue'
export { default as MemberNav } from '../../components/MemberNav.vue'
export { default as MenuList } from '../../components/MenuList.vue'
export { default as OrderConfirmation } from '../../components/OrderConfirmation.vue'
export { default as OrderCooked } from '../../components/OrderCooked.vue'
export { default as OrderMenu } from '../../components/OrderMenu.vue'
export { default as OrderQuantity } from '../../components/OrderQuantity.vue'
export { default as PromptLogin } from '../../components/PromptLogin.vue'
export { default as SelectQuantity } from '../../components/SelectQuantity.vue'
export { default as ShopEditOrder } from '../../components/ShopEditOrder.vue'
export { default as UserList } from '../../components/UserList.vue'
export { default as UserNav } from '../../components/UserNav.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
