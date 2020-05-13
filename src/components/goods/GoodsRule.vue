<template>
    <div class="goodsRule-container">
        <div class="goodsRule-content">
            <div class="rule-head">
                <div class="rule-head-img">
                    <img :src="dataInfo.imgUrl" alt="">
                </div>
                <div class="rule-head-text">
                    <div class="h-title">{{ dataInfo.name }}</div>
                    <div class="h-hint">
                        {{ getSpace }}
                    </div>
                    <div class="h-price">￥{{ getPrice | formatMoney }}</div>
                </div>
            </div>
            <div class="rule-main">
                <div
                    class="rule-list"
                    v-for="(item, index) in classList"
                    :key="index"
                >
                    <div class="rule-list-title">
                        {{ item.name }}
                    </div>
                    <ul>
                        <li
                            v-for="(names, idx) in item.list"
                            :key="idx"
                            :class="[{'active': selected[index] === idx }]"
                            @click="changeSpace(index, idx)"
                        >
                            {{ names }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rule-btn">
            <div @click="addCar()">选好了</div> 
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { classList } from '@/utils/goods'
export default {
    props: {
        visible: {
            type: Boolean
        },
        dataInfo: {
            type: Object,
            required: true
        },
    },
    data () {
        return {
            classList,
            selected: [0, 0, 0, null]
        }
    },
    computed: {
        getPrice () {
            let list = ['s', 'm', 'l']
            let key = list[this.selected[0]]
            return this.dataInfo[key]
        },
        getSpace () {
            let list = this.selected.filter(r => r != null).map((r, i) => {
                return this.classList[i].list[r]
            })
            return list.join('/')
        }
    },
    watch: {
        visible (val) {
            if (val) {
                this.selected = [0, 0, 0, null]
            }
        }
    },
    methods: {
        ...mapActions([
            'addCarList',
        ]),
        // 切换规格
        changeSpace (index, idx) {
            this.$set(this.selected, index, idx)
        },
        // 添加
        addCar () {
            let goods = {
                goodsHint: this.getSpace,
                price: this.getPrice,
                count: 1
            }
            let data = Object.assign({}, this.dataInfo, goods)
            // console.log(data)
            this.addCarList(data)
            this.$emit('close')
            // 回到默认
            this.selected = [0, 0, 0, null]
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.goodsRule-container {
    .goodsRule-content {
        position: relative;
        padding: 8px 12px;
        .rule-head {
            @include flexBox(flex-start);
            @include setBox(100%, 100px);
            &-img {
                @include setBox(70px, 80px);
                img {
                    @include setBox();
                }
            }
            &-text {
                width: 250px;
                text-align: left;
                padding: 0px 15px;
                .h-title {
                    font-size: $font_max;
                    font-weight: bold;
                }
                .h-hint {
                    margin: 10px 0;
                    font-size: $font_m;
                    @include textOverFlow(2);
                }
                .h-price {
                    color: #985e37;
                    font-size: $font_max;
                    font-weight: bold;
                }
            }
        }
        .rule-main {
            text-align: left;
            max-height: 300px;
            padding:5px 0 20px;
            @include scrollBox();
            .rule-list {
                font-size: $font_p;
                &-title {
                    margin-bottom: 12px;
                }
                ul {
                    @include flexBox(flex-start);
                    flex-wrap: wrap;
                    font-size: $font_m;
                    li {
                        padding: 8px 12px;
                        margin-bottom: 12px;
                        margin-right: 10px;
                        background: #ddd;
                        color: #000;
                        &.active {
                            background: #b6e8ce;
                            color: $color_active;
                        }
                    }
                }
            }
        }
    }
    .rule-btn {
        position: absolute;
        width: 100%;
        left: 0;
        padding: 10px 12px 15px;
        bottom: 0;
        background: #fcfcfc;
        >div {
            @include setBox(100%, 40px);
            @include flexBox();
            font-size: $font_p;
            background-color: $color_active;
            color: #fff;
        }
    }
}
</style>