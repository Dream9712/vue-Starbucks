import Vue from 'vue'
import { formatDate } from '@/utils/utils'

Vue.filter('formatMoney', (val) => {
    if (!val || val == 0) return "0"
    return parseInt(val).toFixed(2)
})

Vue.filter('formatDate', formatDate)