import { 
    Toast
} from 'vant'
import { deepClone } from '@/utils/utils'
export default {
    state: {
        // 用户信息
        userInfo: {},
        // 地址信息
        addressList: [
            {
                id: Date.parse(new Date).toString(),
                addressDetail: "1",
                areaCode: "110102",
                city: "北京市",
                country: "",
                county: "西城区",
                isDefault: true,
                name: "test1",
                postalCode: "",
                province: "北京市",
                tel: "13412341234",
                address: "北京市北京市西城区 1"
            }
        ],
    },
    getters: {
        // 用户信息
        userInfo: state => state.userInfo,
        // token
        getToken: state => state.userInfo.token,
    },
    mutations: {
        // 设置用户信息
        setUser (state, data) {
            state.userInfo = data
        },
        // 设置地址
        setAddress (state, data) {
            state.addressList = data
        }
    },
    actions: {
        // 清空信息数据
        clearUserInfo ({ commit }) {
            commit('setUser', {})
        },
        // 添加地址
        addressAction ({ state, commit }, data) {
            let list = deepClone(state.addressList)
            // 是否重复
            let flag = list.some(r => JSON.stringify(r) == JSON.stringify(data))
            if (flag) {
                return Toast('请勿添加重复地址信息')
            }
            // 默认地址
            if (data.isDefault) {
                list.forEach((item) => {
                    item.isDefault = false
                })
            }
            list.push(data)
            commit('setAddress', list)
        },
        // 编辑地址
        editAddress ({ state, commit }, data) {
            let list = deepClone(state.addressList)
            for (let k in list) {
                if (list[k].id == data.id) {
                    list[k] = data
                }
            }
            commit('setAddress', list)
        },
        // 删除地址
        delAddress ({ state, commit }, id) {
            let list = deepClone(state.addressList)
            // 过滤删除的id
            list = list.filter(r => r.id != id)
            commit('setAddress', list)
        },
        // 选择地址
        selectAddress ({ state, commit}, id) {
            let list = deepClone(state.addressList)
            list.forEach((item) => {
                if (item.id == id) {
                    item.isDefault = true
                } else {
                    item.isDefault = false
                }
            })
            commit('setAddress', list)
        }
    }
}