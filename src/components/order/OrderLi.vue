<template>
    <div class="order-li-content">
        <ul v-if="orderList.length > 0">
            <li
                v-for="(item, index) in orderList"
                :key="index"
            >
                <van-cell value="订单已完成">
                    <template #title>
                        <span class="custom-title">萧山店</span>
                        <van-icon name="arrow" />
                    </template>
                </van-cell>
                <div class="order-lists">
                    <div
                        class="order-lists-p"
                        v-for="(goods, idx) in getGoods(item.list)"
                        :key="idx"
                        @click="toDetail(item)"
                    >
                        <span>{{ goods.name }}</span>
                        <span class="lists-p-num">
                            x {{ goods.count }}
                            <span>￥{{ goods.price }}</span>
                        </span>
                    </div>
                    <div class="order-lists-price">
                        <div>
                            <div v-if="item.list.length > 3">...</div>
                        </div>
                        <div>
                            <span>共{{ item.list.length }}件商品</span>
                            <span>
                                实付
                                <strong>￥{{ item.totalPrice }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="order-lists-btn">
                        <span v-if="item.list.length < 3">去评论</span>
                    </div>
                </div>
            </li>
        </ul>                                       
        <div v-else class="no-content">暂无订单</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        types: {
            type: Number,
            default: 1
        }
    },
    data () {
        return { }
    },
    computed: {
        ...mapGetters([
			'orderLists',
        ]),
        orderList () {
            return this.orderLists.filter(r => r.goodsType == this.types + 1)
        }
    },
    methods: {
        // 只取前面三个
        getGoods (list) {
            return list.slice(0, 3)
        },
        toDetail (item) {
            this.$router.push({
                path: '/orderDetail',
                query: {
                    orderId: item.orderId
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.order-li-content {
    padding: 10px 0 20px;
    ::v-deep ul {
        position: relative;
        text-align: left;
        li {
            margin-bottom: 10px;
            background: #fff;
            padding-bottom: 5px;
            .van-cell {
                font-size: $font_h1;
                .van-cell__title {
                    font-weight: 600;
                    @include flexBox(flex-start);
                    span {
                        margin-right: 5px;
                    }
                }
                .van-cell__value {
                    font-size: $font_h;
                    color: #333;
                }
            }
            .order-lists {
                padding: 5px 15px;
                color: #666;
                &-p {
                    padding: 3px 0;
                    @include flexBox(space-between);
                    .lists-p-num {
                        span {
                            margin-left: 20px;
                        }
                    }
                }
                &-price{
                    @include flexBox(space-between);
                    >div{
                        height: 20px;
                        @include flexBox();
                        >div{
                            padding-bottom: 5px; 
                            font-weight: bold;
                            letter-spacing: 2px;
                        }
                    }
                }
                &-btn {
                    @include flexBox(flex-end);
                    span {
                        padding: 5px 20px;
                        border: 1px solid #ddd;
                        margin: 10px 0 5px;
                        border-radius: 3px;
                    }
                }
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