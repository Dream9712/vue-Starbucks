<template>
    <div class="payOrder-container">
        <div class="payOrder-content">
            <van-cell class="order-timer" title="取餐时间" is-link value="立即取餐" />
            <div class="order-progress">
                <div class="order-progress-title">
                    排队进度
                </div>
                <div>
                    <span>
                        前面还有
                        <span class="num">6单</span>
                        /
                    </span>
                    <span class="num">共8杯</span>
                    <span>制作中</span>
                </div>
            </div>
            <van-cell class="order-store" value="萧山建设三路店" />
            <div class="order-list">
                <ul>
                    <li
                        v-for="(item , index ) in carlists"
                        :key="index"
                    >
                        <div class="li-img">
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <div class="li-info">
                            <div class="li-info-title">
                                <span>{{ item.name }}</span>
                                <span>￥{{ item.price }}</span>
                            </div>
                            <div class="li-info-num">
                                <span>{{ item.goodsHint }}</span>
                                <span>x {{ item.count }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="sum_money">
                    小计
                    <span>￥{{ totalAmount | formatMoney }}</span>
                </div>
            </div>
            <van-field  autosize clearable 
                label="备注" placeholder="备注说明"
                v-model="remarks"
                class="remarks"
            />
            <div class="price-btn">
                <div class="price-btn-num">
                    待支付<span>￥{{ totalAmount | formatMoney }}</span>
                </div>
                <div class="price-btn-btn">
                    <van-button
                        type="primary"
                        @click="commitOrder()"
                        :loading="loadding"
                    >提交订单</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { deepClone } from '@/utils/utils'
export default {
    name: 'pay',
    data () {
        return {
            remarks: '' ,
            loadding: false,
        }
    },
    computed: {
        ...mapGetters([
			'carlists',
			'totalAmount',
		])
    },
    created () {
        if (this.carlists.length < 1) {
            this.$router.push('/order')
        }
    },
    methods: {
        ...mapMutations(['addOrderList']),
        ...mapActions(['clearGoodsInfo']),
        // 提交订单
        commitOrder () {
            if (this.carlists.length < 1) return
            this.loadding = true
            /* 以为忽略支付 直接跳转 */
            let orderId = Date.parse(new Date())
            let data = {
                type: '微信',
                orderId,
                createTimer: orderId,
                payTimer: orderId,
                remarks: this.remarks,
                totalPrice: this.totalAmount,
                list: deepClone(this.carlists)
            }
            this.addOrderList(data) 

            setTimeout(() => {
                // 清空购物车 商品数量
                this.clearGoodsInfo()
                // 前往订单详情
                this.$router.push({
                    path: '/orderDetail',
                    query: {
                        orderId,
                        isPay: 1
                    }
                })
            }, 1500)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.payOrder-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 44px);
    background: #f6f6f6;
    text-align: left;
    ::v-deep .payOrder-content {
        position: relative;
        padding-bottom: 60px;
        font-size: $font_p;
        .order-timer {
            .van-cell__title {
                font-weight: bold;
                font-size: $font_h1;
            }
            .van-cell__value {
                color: $color_active;
            }
        }
        .order-progress {
            position: relative;
            margin: 5px 0;
            width: 100%;
            padding: 10px 16px;
            overflow: hidden;
            color: #323233;
            background-color: #fff;
            @include flexBox(space-between);
            &-title {
                font-weight: bold;
                font-size: $font_h1;
            }
            .num {
                color: $color_active;
            }
        }
        .order-store {
            .van-cell__value {
                color: #b0a7a7;
            }
        }
        .price-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 0 12px;
            @include setBox(100%, $foot_px);
            @include flexBox(space-between);
            background: #fff;
            &-num {
                font-size: $font_max;
                span {
                    margin-left: 5px;
                    color: $color_price;
                    font-size: $font_h1;
                }
            }
            &-btn {
                .van-button {
                    width: 100px;
                    background-color: $color_active;
                }
            }
        }
        .remarks {
            margin-top: 5px;
            margin-bottom: 20px;
            .van-field__control {
                text-align: right;
                &:focus {
                    text-align: left;
                }
            }
            &::after {
                border-bottom: none;
            }
        }
    }
}
</style>