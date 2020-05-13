import { goodsData } from '@/utils/goods'
import { goodsFlag, deepClone } from '@/utils/utils'

// 添加count
goodsData.forEach((item) => item.list.forEach((ele, idx) => {
    ele.titleName = item.name
    ele.count = 0
    ele.id = idx + 1
}))
export default {
    state: {
        goodsData,
        // 购物车列表
        carlist: []
    },
    getters: {
        // 商品数据
        goodsData: state => state.goodsData,
        // 商品tab
        goodsTab: state => state.goodsData.map(r => r.name),
        // 购物车列表
        carlists: state => state.carlist,
        // 数量
        carCount: state => {
            if (state.carlist.length == 0) return 0
            return state.carlist.reduce((p, e) => {
				return p*1 + e.count * 1
			}, 0)
        },
        // 小计
        totalAmount: state => {
            if (state.carlist.length == 0) return 0
            return state.carlist.reduce((p, e) => {
				return p*1 + e.price * e.count
			}, 0)
        }
    },
    mutations: {
        // 设置商品列表
        setGoodsData (state, data) {
            state.goodsData = data
        },
        // 商品列表数量设置为0
        setGoodsDefault (state, data) {
            data.forEach(ele => ele.list.forEach(item => item.count = 0))
            state.goodsData = data
        },
        // 设置购物车列表
        setCarList (state, data) {
            state.carlist = data
        },
    },
    actions: {
        // 清空商品\购物车信息
        clearGoodsInfo ({ commit }) {
            commit('setGoodsDefault', goodsData)
            commit('setCarList', [])
        },
        // 商品列表数据跟购物车数据同步
        syncGoodsList ({ state, commit }, data) {
            let list = deepClone(state.goodsData)
            let carList = state.carlist
            // 获取存在有多少该商品id 的数量
            let num = carList.filter(r => r.id == data.id).reduce((p, ele) => p + ele.count * 1, 0)
            list.forEach(item => {
                if (item.name == data.titleName) {
                    item.list.forEach(eles => {
                        if (data.id == eles.id) {
                            eles.count = num
                        }
                    })
                }
            })
            commit('setGoodsData', list)
        },
        // 添加
        addCarList ({ state, commit, dispatch }, data) {
            let list = deepClone(state.carlist)
            // 是否重复存在
            let flag = list.some(r => goodsFlag(r, data))
            if (flag) {
                // 数量加一
                for(let k in list) {
                    if (goodsFlag(list[k], data)) {
                        list[k].count++
                    }
                }
            } else {
                list.push(data)
            }
            commit('setCarList', list)
            dispatch('syncGoodsList', data)
        },
        // 添加数量
        addAmount ({ state, commit, dispatch }, data) {
            let list = deepClone(state.carlist)
            list.forEach(ele => {
                if (goodsFlag(ele, data)) {
                    ele.count++
                }
            })
            commit('setCarList', list)
            dispatch('syncGoodsList', data)
        },
        // 减少数量
        cutAmount ({ state, commit, dispatch }, data) {
            let list = deepClone(state.carlist)
            list.forEach(ele => {
                if (goodsFlag(ele, data)) {
                    ele.count--
                }
            })
            list = list.filter(r => r.count > 0)
            commit('setCarList', list)
            dispatch('syncGoodsList', data)
        }
    }
}