<template>
    <div class="orderDetail-container">
        <div class="desc-head">
            <div class="desc-title">
                <van-cell center title="萧山建设三路店" label="浙江省杭州市萧山区" is-link/>
                <div class="desc-title-text">
                    <p class="text_h1">立即取餐</p>
                    <p>取餐号</p>
                    <p class="text_max num">B17</p>
                    <p>请向商家出示取餐号</p>
                </div>
                <div class="desc-title-order">
                    <span>前面还有
                        <span class="num"> 6单 / </span>
                    </span>
                    <span class="num">共8杯 </span>
                    <span>制作中</span>
                </div>
            </div>
        </div>
        <div class="title-h1">订单已接单</div>
        <van-cell class="order-store" value="萧山建设三路店" />
        <div class="order-list">
            <ul>
                <li
                    v-for="(item , index ) in orderInfo.list"
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
                合计
                <span>￥{{ orderInfo.totalPrice | formatMoney }}</span>
            </div>
        </div>
        <ul class="orderInfo-card">
            <li>
                订单编号:
                <span>{{ orderInfo.orderId }}</span>
            </li>
            <li>
                下单时间:
                <span>{{ orderInfo.createTimer | formatDate }}</span>
            </li>
            <li>
                支付方式:
                <span>{{ orderInfo.type }}</span>
            </li>
            <li>
                支付时间:
                <span>{{ orderInfo.payTimer | formatDate }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {  mapGetters } from 'vuex'
export default {
    name: 'orderDetail',
    data () {
        return {}
    },
    computed: {
        ...mapGetters(['orderDeatails']),
        orderInfo () {
            return this.orderDeatails(this.$route.query.orderId)
        }
    },
    created () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.orderDetail-container {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 44px);
    background: #f6f6f6;
    text-align: left;
    ::v-deep .desc-head {
        position: relative;
        padding: 10px 15px;
        background: #fcfcfc;
        .desc-title {
            background: #fff;
            box-shadow: 0 0 1px #ccc;
            .van-cell {
                padding: 15px 2 0px;
            }
            .van-cell__title {
                font-size: $font_max;
                font-weight: bold;
                .van-cell__label {
                    font-weight: normal;
                    margin-top: 10px;
                    color: #666;
                    font-size: $font_m;
                }
            }
            &-text {
                margin: 0 20px;
                text-align: center;
                border-bottom: 1px solid #efefef;
                p {
                    padding: 10px 0;
                    &.text_h1 {
                        font-size: $font_h1;
                        padding: 20px 0;
                    }
                    &.text_max {
                        font-size: 22px;
                        font-weight: bold;
                        color: $color_active;
                    }
                }
            }
            &-order {
                text-align: center;
                padding: 20px 0;
            }
        }
    }
    .order-list {
        .sum_money span {
            color: #333;
        }
    }
    .title-h1 {
        background: #fff;
        padding: 10px 15px;
        margin: 10px 0;
        font-size: $font_h1;
        font-weight: bold;
    }
    .orderInfo-card {
        width: 100%;
        padding: 5px 15px;
        background: #fff;
        margin: 10px 0 0;
        li {
            margin: 10px 0;
            span {
                color: #666;
                margin-left: 5px;
            }
        }
    }
}
</style>