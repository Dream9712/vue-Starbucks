<template>
    <div class="home-container">
        <div class="home-banner">
            <Banner :list="bannerList" />
        </div>
        <div class="home-btn">
            <router-link to="/goods">点餐</router-link>
            <router-link to="/goods">外卖</router-link>
        </div> 
    </div>
</template>

<script>
import Banner from '@/components/common/Banner'
export default {
    name: 'Home',
    components: {
        Banner
    },
    data () {
        return {
            bannerList: [
                {
                    src: require('../../assets/img/home/banner-2.jpg')
                },
                {
                    src: require('../../assets/img/home/banner-3.jpg')
                },
                {
                    src: require('../../assets/img/home/banner-4.jpg')
                }
            ]
        }
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.home-container {
    @include fixedBg($head_px, $foot_px);
    background-image: url('~@/assets/img/home/home-bg.png');
    background-size: cover;
    .home-banner {
        height: 200px;
        background-color: #ccc;
    }
    .home-btn {
        width: 100%;
        padding: 60px 30px;
        @include flexBox(space-between);
        a {
            width: 46%;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background: $color_active;
            color: #fff;
            border-radius: 5px;
        }
    }
}
</style>