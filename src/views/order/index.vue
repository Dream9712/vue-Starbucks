<template>
    <div class="order-container">
        <ul class="order-tab">
            <li
                v-for="(item, index) in tabList"
                :key="index"
                :class="{ 'active': index == tabIdx }"
                @click="changeTab(index)"
            >
                {{ item }}
            </li>
        </ul>
        <div class="order-content">
            <OrderLi v-if="orderLists.length > 0" />
            <div class="no-content" v-else>暂无订单</div>
        </div>
    </div>
</template>

<script>
import {  mapGetters } from 'vuex'
import OrderLi from '@/components/order/OrderLi'
export default {
    name: 'order',
    components: {
        OrderLi
    },
    data () {
        return {
            tabList: ['点餐', '外卖'],
            tabIdx: 0
        }
    },
    computed: {
        ...mapGetters(['orderLists']),
    },
    methods: {
        changeTab (idx) {
            this.tabIdx = idx
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.order-container {
    width: 100%;
    background: #f6f6f6;
    min-height: calc(100vh - 44px - 60px);
    padding-top: 80px;
    .order-tab {
        position: fixed;
        top: $head_px;
        width: 100%;
        background: #fff;
        height: 80px;
        padding: 0 25px;
        @include flexBox();
        z-index: 9;
        li {
            flex: 1;
            height: 44px;
            background: #ccc;
            font-size: $font_h;
            @include inflexBox();
            &.active {
                background: $color_active;
                color: #fff;
            }
            &:first-child {
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
            } 
            &:last-child {
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
            }
        }
    }
    .no-content {
        font-size: $font_h1;
        color: #666;
        padding-top: 100px;
    }
}
</style>