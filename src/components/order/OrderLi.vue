<template>
    <div class="order-li-content">
        <ul>
            <li
                v-for="(item, index) in orderLists"
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    // props: [],
    data () {
        return { }
    },
    computed: {
        ...mapGetters([
			'orderLists',
        ]),
    },
    created () {

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
}

.order_box{
    margin-top: 5px;
}
.order_text{
    margin: 0 0 2px 0;
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    justify-content: space-between;
}

.order_title span{
       font-size: 15px;
}
.order_desc{
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    justify-content: space-between;
}
.order_desc div span{
        font-size: 15px;
}
.order_desc div:nth-child(2) span:nth-child(1){
    margin-right: 10px;
}
.order_list{
    background: #fff;
    margin-bottom: 5px;
}
.odright{
    padding-right: 15px;
    text-align: right;
}
.pl_btn{
    float: right;
    padding: 5px 20px;
    border: 2px solid #e1e1e1;
    border-radius: 3px;
    margin: 10px 15px 10px 0;
}
</style>