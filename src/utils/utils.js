// 设置 localStorage 缓存
export const localStore = {
    set (name, value) {
        return localStorage.setItem(name, value)
    },
    get (name) {
        return localStorage.getItem(name)
    },
    clear () {
        localStorage.clear()
    }
}
// 深拷贝
export const deepClone = (source) => {
    let target
    if (typeof source === 'object') {
        target = Array.isArray(source) ? [] : {}
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] !== 'object') {
                    target[key] = source[key]
                } else {
                    target[key] = deepClone(source[key])
                }
            }
        }
    } else {
        target = source
    }
    return target
}

// 转换时间 YY-MM-DD h:m:s
export const formatDate = (ms) => {
    let time = new Date(ms)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return `${year}-${month}-${date} ${h}:${m}:${s}`
}


// 判断商品是否一致   id 与 规格
export const goodsFlag = (list, data) => {
    // 商品页减少商品 不需要匹配规格
    if (!data.goodsHint) {
        return list.id == data.id
    }
    return (list.id == data.id) && (list.goodsHint == data.goodsHint)
}