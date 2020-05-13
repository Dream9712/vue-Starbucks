import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    redirect: '/',
  },
  // 首页
  {
    path: '/',
    name: 'Home',
    meta: { navBar: true, title: '星巴克自助点餐' },
    component: () => import(/* webpackChunkName: "Home" */ '../views/home')
  },
  // 我的
  {
    path: '/userCenter',
    name: 'UserCenter',
    meta: { navBar: true, title: '我的' },
    component: () => import(/* webpackChunkName: "UserCenter" */ '../views/user')
  },
  // 订单
  {
    path: '/order',
    name: 'Order',
    meta: { navBar: true, title: '我的订单' },
    component: () => import(/* webpackChunkName: "Order" */ '../views/order')
  },
  // 订单详情
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    meta: { headBack: true, title: '订单详情' },
    component: () => import(/* webpackChunkName: "OrderDetail" */ '../views/order/Detail.vue')
  },
  // 商品首页
  {
    path: '/goods',
    name: 'Goods',
    meta: { headBack: true, title: '萧山建设三路店' },
    component: () => import(/* webpackChunkName: "Goods" */ '../views/goods')
  },
  // 收货地址
  {
    path: '/address',
    name: 'Address',
    meta: { headBack: true, title: '收货地址' },
    component: () => import(/* webpackChunkName: "Address" */ '../views/user/address')
  },
  // 添加/编辑 选址
  {
    path: '/editAddress',
    name: 'editAddress',
    meta: { headBack: true, title: '添加收获地址' },
    component: () => import(/* webpackChunkName: "editAddress" */ '../views/user/address/Edit.vue')
  },
  {
    path: '/goodsPay',
    name: 'GoodsPay',
    meta: { headBack: true, title: '提交订单' },
    component: () => import(/* webpackChunkName: "GoodsPay" */ '../views/pay')
  },
  // 使用须知
  {
    path: '/instructions',
    name: 'Instructions',
    meta: { headBack: true, title: '使用须知' },
    component: () => import(/* webpackChunkName: "Instructions" */ '../views/user/Instructions.vue')
  },
  // 登录
  {
    path: '/login',
    name: 'Login',
    meta: { headHidden: true },
    component: () => import(/* webpackChunkName: "Login" */ '../views/user/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = store.getters.getToken
  // 未登录 => login
  if (!token && to.name != 'Login') {
    next({ path:'/login' })
  }
  // 已登录 => 首页
  if (token && to.name == 'Login') {
    next('/')
  }
  next()
})


export default router
