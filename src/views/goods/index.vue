<template>
    <div class="goods-container">
        <!-- 公告 -->
        <div class="goods-coin">
            公告：单笔买满十杯，送一杯，详情请见订阅须知。
        </div>
        <!-- 商品列表 -->
        <div class="goods-content">
            <van-index-bar :sticky="true" :sticky-offset-top="40" :index-list="goodsTab">
                <div class="goods-banner">
                    <img src="../../assets/img/goods/goods-banner.jpg" alt="">
                </div>
                <div
                    v-for="(item, index) in goodsData"
                    :key="index"
                >
                    <van-index-anchor :index="item.name">{{ item.name }}</van-index-anchor>
                    <div
                        class="goods-li"
                        v-for="(goods, gid) in item.list"
                        :key="gid"
                    >
                        <div class="goods-li-logo">
                            <img class="logo-img" :src="goods.imgUrl" alt="">
                            <!-- <img class="logo-icon" src="" alt=""> -->
                        </div>
                        <div class="goods-li-text">
                            <div class="goods-li-text-title">
                                {{ goods.name }}
                            </div>
                            <div class="goods-li-text-hint">
                                {{ goods.describe }}
                            </div>
                            <div class="goods-cat-btn">
                                <div class="btn-price">
                                    ￥{{ goods.s | formatMoney }}
                                </div>
                                <div class="btn-all">
                                    <span
                                        class="btn-icon cut-icon"
                                        v-if="goods.count && goods.count > 0"
                                        @click="cutGoodsCount(goods)"
                                    ></span>
                                    <span
                                        class="btn-all-num"
                                        v-if="goods.count && goods.count > 0"
                                    >
                                        {{ goods.count }}
                                    </span>
                                    <span
                                        class="btn-icon add-icon"
                                        @click="changeGoods(goods)"
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-index-bar>
        </div>
        <!-- 选择规格 -->
        <van-popup
            closeable
            class="goodsRule-popup"
            v-model="visible"
            position="bottom"
            :style="{ height: '70%' }"
        >
            <GoodsRule :visible="visible" :dataInfo="selectData" @close="visible = false"/>
        </van-popup>
        <!-- 底部购物车 -->
        <GoodsList />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import GoodsRule from '@/components/goods/GoodsRule'
import GoodsList from '@/components/goods/GoodsList'
export default {
    name: 'index',
    components: {
        GoodsRule,
        GoodsList,
    },
    data () {
        return {
            visible: false,
            selectData: {}
        }
    },
    computed: {
        ...mapGetters([
            'goodsData',
            'goodsTab',
            'carlists'
        ]),
    },
    created () {
    },
    methods: {
        ...mapActions([
            'cutAmount'
        ]),
        // 添加商品
        changeGoods (item) {
            this.visible = true
            this.selectData = item
        },
        // 减少商品
        cutGoodsCount (item) {
            // 是否存在规格不一样的
            let list = this.carlists.filter(r => r.id == item.id)
            if (list.length > 1) {
                this.$toast('多规格商品请在购物车删除哦')
            } else {
                this.cutAmount(item)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.goods-container {
    .goods-coin {
        position: fixed;
        top: $head_px;
        left: 0;
        @include setBox(100%, 40Px);
        background: $color_active;
        color: #fff;
        font-size: $font_p;
        @include flexBox();
        padding: 10px 20px;
        z-index: 19;
    }
    ::v-deep .goods-content {
        margin-top: 40Px;
        padding-left: 100px;
        padding-bottom: 60px;
        .goods-banner {
            @include setBox(100%, 150px);
            padding: 10px;
            img {
                @include setBox();
            }
        }
        .goods-li {
            @include flexBox(space-between);
            padding: 8px 10px;
            &-logo {
                position: relative;
                @include setBox(70px, 60px);
                .logo-img {
                    @include setBox();
                }
                // 
                .logo-icon {

                }
            }
            &-text {
                padding: 0 5px;
                width: 180px;
                text-align: left;
                &-title {
                    font-size: $font_h1;
                    font-weight: bold;
                }
                &-hint {
                    margin: 5px 0;
                    color: $color_font;
                    font-size: $font_s;
                    @include textOverFlow(2);
                }
            }
        }
        .van-index-bar {
            // padding: 0 10px;
            .van-index-anchor--sticky {
                color: #000;
                line-height: 45px;
                top: $head_px;
            }
            .van-index-bar__sidebar {
                width: 100px;
                top: $head_px;
                left: 0;
                bottom: $foot_px;
                right: auto;
                transform: none;
                background: #f1f1f1;
                padding-top: 40Px;
                @include scrollBox();
                .van-index-bar__index {
                    position: relative;
                    padding: 0;
                    font-size: $font_h;
                    font-weight: normal;
                    line-height: 46px;
                    color: #333;
                    &::before {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        border-bottom: 1px solid #ddd;
                        transform: scaleY(.5);
                        z-index: 9;
                    }
                    &--active {
                        background: #fff;
                        color: #333;
                    }
                }
            }
            .van-index-anchor {
                padding: 0 10px;
                text-align: left;
            }
        }
    }
    ::v-deep .goodsRule-popup {
        background: #fcfcfc;
    }
}
</style>