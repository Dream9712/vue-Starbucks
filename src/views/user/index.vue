<template>
    <div class="user-container">
        <div class="user-info">
            <div class="user-avtar">
                <img src="../../assets/img/user-avtar.jpg" alt="">
            </div>
            <div class="user-name">{{ userInfo.username }}</div>
            <div class="user-tel">{{ userInfo.tel }}</div>
        </div>
        <div class="user-link">
            <van-cell is-link to="/address">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="location-o" />
                    <span class="custom-title">收货地址</span>
                </template>
            </van-cell>
            <van-cell is-link to="/instructions">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="notes-o" />
                    <span class="custom-title">使用须知</span>
                </template>
            </van-cell>
        </div>
        <div class="user-loginout" @click="loginout()">
           退出登录
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'userCenter',
    data () {
        return {}
    },
    computed: {
        ...mapGetters(['userInfo']),
    },
    methods: {
        ...mapActions(['clearUserInfo', 'clearGoodsInfo', 'clearOrderInfo']),
        // 退出登录
        loginout () {
            this.clearUserInfo()
            this.clearGoodsInfo()
            this.clearOrderInfo()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.user-container {
    @include fixedBg($head_px, $foot_px);
    background: #f6f6f6;
    .user-info {
        background: #fff;
        height: 160px;
        margin-bottom: 20px;
        @include flexBox();
        flex-direction: column;
        .user-avtar {
            @include setBox(60px, 60px);
            img {
                @include setBox();
                border-radius: 50%;
            }
        }
        .user-name {
            font-size: $font_h1;
            font-weight: bold;
            margin-top: 5px;
        }
        .user-tel {
            color: #666;
            margin-top: 5px;
        }
    }
    ::v-deep .user-link {
        text-align: left;
        font-size: $font_h1;
        .van-cell__title {
            @include flexBox();
            justify-content: flex-start;
            i {
                font-size: $font_h1;
                margin-right: 5px;
            }
        }
    }
    .user-loginout {
        @include setBox(88%, 40px);
        @include flexBox();
        margin: 50px auto;
        background: $color_active;
        color: #fff;
        border-radius: 5px;
    }
}
</style>