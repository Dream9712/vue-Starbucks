import { deepClone } from '@/utils/utils'

export default {
    state: {
        orderList: [],
    },
    getters: {
        orderLists: state => state.orderList,
        // 订单详情
        orderDeatails: state => (id) => {
            return state.orderList.find(r => r.orderId == id) || {}
        }
    },
    mutations: {
        setOrderDefault (state) {
            state.orderList = []
        },
        addOrderList (state, data) {
            state.orderList.push(data)
        }
    },
    actions: {
        clearOrderInfo ({ commit }) {
            commit('setOrderDefault')
        }
    }
}