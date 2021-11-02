import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9915b77e = () => interopDefault(import('../pages/cart/index.vue' /* webpackChunkName: "pages/cart/index" */))
const _2bd16ada = () => interopDefault(import('../pages/error.vue' /* webpackChunkName: "pages/error" */))
const _2c2788ba = () => interopDefault(import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */))
const _696523fb = () => interopDefault(import('../pages/admin/member/index.vue' /* webpackChunkName: "pages/admin/member/index" */))
const _7046b600 = () => interopDefault(import('../pages/admin/menu/index.vue' /* webpackChunkName: "pages/admin/menu/index" */))
const _f31b1528 = () => interopDefault(import('../pages/admin/user/index.vue' /* webpackChunkName: "pages/admin/user/index" */))
const _334c22db = () => interopDefault(import('../pages/auth/done.vue' /* webpackChunkName: "pages/auth/done" */))
const _70489fe0 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _51b5ecfc = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _67803686 = () => interopDefault(import('../pages/cart/order.vue' /* webpackChunkName: "pages/cart/order" */))
const _795be549 = () => interopDefault(import('../pages/cart/order_completed.vue' /* webpackChunkName: "pages/cart/order_completed" */))
const _4f09209b = () => interopDefault(import('../pages/order/updated_order.vue' /* webpackChunkName: "pages/order/updated_order" */))
const _7a43208a = () => interopDefault(import('../pages/admin/member/register.vue' /* webpackChunkName: "pages/admin/member/register" */))
const _6bd33515 = () => interopDefault(import('../pages/admin/menu/completed_menu.vue' /* webpackChunkName: "pages/admin/menu/completed_menu" */))
const _31921120 = () => interopDefault(import('../pages/admin/menu/create_menu.vue' /* webpackChunkName: "pages/admin/menu/create_menu" */))
const _4acd4b25 = () => interopDefault(import('../pages/admin/menu/updated_menu.vue' /* webpackChunkName: "pages/admin/menu/updated_menu" */))
const _f35c2dba = () => interopDefault(import('../pages/admin/member/_id.vue' /* webpackChunkName: "pages/admin/member/_id" */))
const _cbeb8f30 = () => interopDefault(import('../pages/admin/menu/_id.vue' /* webpackChunkName: "pages/admin/menu/_id" */))
const _2fe966b8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _9915b77e,
    name: "cart"
  }, {
    path: "/error",
    component: _2bd16ada,
    name: "error"
  }, {
    path: "/order",
    component: _2c2788ba,
    name: "order"
  }, {
    path: "/admin/member",
    component: _696523fb,
    name: "admin-member"
  }, {
    path: "/admin/menu",
    component: _7046b600,
    name: "admin-menu"
  }, {
    path: "/admin/user",
    component: _f31b1528,
    name: "admin-user"
  }, {
    path: "/auth/done",
    component: _334c22db,
    name: "auth-done"
  }, {
    path: "/auth/login",
    component: _70489fe0,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _51b5ecfc,
    name: "auth-register"
  }, {
    path: "/cart/order",
    component: _67803686,
    name: "cart-order"
  }, {
    path: "/cart/order_completed",
    component: _795be549,
    name: "cart-order_completed"
  }, {
    path: "/order/updated_order",
    component: _4f09209b,
    name: "order-updated_order"
  }, {
    path: "/admin/member/register",
    component: _7a43208a,
    name: "admin-member-register"
  }, {
    path: "/admin/menu/completed_menu",
    component: _6bd33515,
    name: "admin-menu-completed_menu"
  }, {
    path: "/admin/menu/create_menu",
    component: _31921120,
    name: "admin-menu-create_menu"
  }, {
    path: "/admin/menu/updated_menu",
    component: _4acd4b25,
    name: "admin-menu-updated_menu"
  }, {
    path: "/admin/member/:id",
    component: _f35c2dba,
    name: "admin-member-id"
  }, {
    path: "/admin/menu/:id",
    component: _cbeb8f30,
    name: "admin-menu-id"
  }, {
    path: "/",
    component: _2fe966b8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
