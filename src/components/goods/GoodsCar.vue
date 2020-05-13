<template>
    <div class="goodsCar-container">
        <transition name="fade">
            <div class="model-bg" v-if="visible" @click="$emit('close')"></div>
        </transition>
        <div :class="['goodsCar-content', { 'active': visible }]">
            <div class="goodsCar-title">
                <span>已选商品</span>
                <span class="goodsCar-del" @click="clearCar()">
                    <van-icon name="delete" />
                    删除
                </span>
            </div>
            <ul class="goodsCar-list">
                <li v-for="(item, index) in carlists" :key="index">
                    <div class="list-text">
                        <div class="list-text-title">{{ item.name }}</div>
                        <div class="list-text-hint">已选: {{ item.goodsHint }}</div>
                    </div>
                    <div class="goods-cat-btn">
                        <div class="btn-price">
                            ￥{{ item.price | formatMoney }}
                        </div>
                        <div class="btn-all">
                            <span class="btn-icon cut-icon" @click="cutClick(item)"></span>
                            <span class="btn-all-num">{{ item.count }}</span>
                            <span class="btn-icon add-icon" @click="addAmount(item)"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {}
    },
    computed: {
        ...mapGetters([
            'carlists'
        ]),
    },
    methods: {
        ...mapActions([
            'addAmount',
            'cutAmount',
            'clearGoodsInfo'
        ]),
        clearCar () {
            this.$emit('close')
            this.clearGoodsInfo()
        },
        cutClick (item) {
            this.cutAmount(item)
            if (this.carlists.length == 0) {
                this.$emit('close')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
$btm: 70px;
.goodsCar-container {
    position: relative;
    .goodsCar-content {
        position: fixed;
        bottom: $btm;
        left: 0;
        width: 100%;
        max-height: 0;
        z-index: 21;
        background: #fff;
        overflow: hidden;
        &.active {
            max-height: 280px;
            transition: all .3s;
        }
        .goodsCar-title {
            background: #f1f1f1;
            height: 50px;
            font-size: $font_h;
            color: #666;
            @include flexBox(space-between);
            padding: 0 20px;
            .goodsCar-del {
                @include inflexBox();
                i {
                    margin-right: 3px;
                    margin-top: 1px;
                }
            }
        }
        .goodsCar-list {
            max-height: 230px;
            @include scrollBox();
            li {
                @include flexBox(space-between);
                padding: 11px 20px;
                .list-text {
                    width: 150px;
                    text-align: left;
                    &-title {
                        font-size: $font_h1;
                    }
                    &-hint {
                        font-size: $font_m;
                        color: #333;
                        padding-top: 10px;
                        @include textOverFlow();
                    }
                }
                .goods-cat-btn {
                    flex: 1;
                    padding:0 10px;
                }
            }
        }
    }
    .model-bg {
        @include fixedBg(0, $btm, 19);
        background: rgba(0, 0, 0, .6);
    }
}
</style>