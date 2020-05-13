import Vue from 'vue'
import axios from 'axios'

//超时响应
axios.defaults.timeout = 15000

// 本地
// axios.defaults.baseURL = "http://localhost:8080"


// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 数据加密、添加loadding效果
        return config
    },
    error => {
        return Promise.error(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            return Promise.reject(error.response)
        }
    }
)


Vue.prototype.$http = axios
