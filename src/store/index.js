import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
// 引入模块的store
import orderStore from './modules/order.store'
import userStore from './modules/user_store'
import goodsStore from './modules/goods_store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modelStatus: false,
  },
  mutations: {
    // 弹出层 body滚动跳失效
    setModelStatus (state, data) {
      state.modelStatus = data
    },
  },
  actions: {
  },
  modules: {
    orderStore,
    userStore,
    goodsStore
  },
  // 持久化
  // plugins: [createPersistedState({})]
  // 持久化  局部缓存
  plugins: [createPersistedState({
    paths: ['userStore', 'goodsStore', 'orderStore']
  })]
})
