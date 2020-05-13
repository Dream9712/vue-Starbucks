<template>
    <div class="head-container">
        <div
            class="head-back"
            v-if="$route.meta && $route.meta.headBack"
            @click="goBack()"
        >
            <van-icon name="arrow-left" />
        </div>
        {{ headTitle }}
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    computed: {
        headTitle () {
            return this.$route.meta ? this.$route.meta.title : ''
        }
    },
    methods: {
        goBack () {
            if (this.$route.query.isPay) {
                return this.$router.push({
                    path: '/order'
                })
            }
            this.$router.back(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.head-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $head_px;
    line-height: $head_px;
    background: $color_active;
    font-size: $font_h1;
    color: #fff;
    z-index: 99;
    .head-back {
        position: absolute;
        left: 0px;
        @include setBox($head_px, $head_px);
        @include flexBox(start);
        padding-left: 12px;
        i {
            font-size: $font_max;
        }
    }
}
</style>