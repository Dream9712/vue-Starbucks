<template>
    <div class="login-container bg-container">
        <div class="login-content">
            <div class="login-title">
                Starbucks
            </div>
            <van-form @submit="loginSubmit">
                <van-field
                    v-model="loginForm.username"
                    name="username"
                    label=""
                    left-icon="user-o"
                    placeholder="请输入用户名"
                    clearable
                    :error="false"
                    error-message=""
                />
                <van-field
                    v-model="loginForm.password"
                    type="password"
                    name="password"
                    label=""
                    left-icon="birthday-cake-o"
                    placeholder="请输入密码"
                    clearable
                    :error="false"
                    error-message=""
                />
                <van-field
                    v-model="loginForm.tel"
                    type="tel"
                    name="tel"
                    label=""
                    left-icon="phone-o"
                    placeholder="请输入手机号码（选填）"
                    clearable
                    :error="false"
                    error-message=""
                />
                <div class="login-btn">
                    <van-button
                        type="info"
                        native-type="submit"
                        round
                        block
                        :loading="loading"
                        loading-text="登录中..."
                    >
                        {{ btnMsg }}
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data () {
        return {
            loginForm: {
                username: 'test1',
                password: 'qwe123456',
                tel: '13413241234'
            },
            loading: false,
            btnMsg: '登录'
        }
    },
    created () {},
    methods: {
        ...mapMutations(['setUser']),
        loginApi (ms) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ code: '0000' })
                }, ms)
            })
        },
        loginSubmit (values) {
            if (!values.username) {
                return this.$toast('请输入用户名')
            }
            if (!values.password) {
                return this.$toast('请输入密码')
            }
            this.loading = true
            this.loginApi(1000).then(res => {
                this.loading = false
                if (res.code == "0000") {
                    // 登录成功
                    let token = values.username + Date.parse(new Date())
                    let userInfo = Object.assign({}, values, { token })
                    this.setUser(userInfo)
                    this.btnMsg = '登录成功'
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 500)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.login-container {
    background: url('~@/assets/img/login-banner.jpg') no-repeat;
    background-size: 100% 100%;
    padding: 0 30px;
    ::v-deep .login-content {
        position: relative;
        width: 100%;
        .login-title {
            font-size: 30px;
            color: $color_active;
            margin: 100px 0 30px;
        }
        .van-form {
            padding: 10px 0;
            background: transparent;
            border-radius: 5px;
            overflow: hidden;
            color: $color_active;
            & > div {
                margin-bottom: 20px;
            }
            .van-cell {
                border: 1px solid $color_active;
                background-color: transparent;
                border-radius: 20px;
                color: $color_active;
                &:not(:last-child)::after {
                    border-bottom: transparent;
                }
                .van-field__value {
                    padding-left: 3px;
                    color: $color_active;
                    .van-field__control {
                        color: $color_active;
                    }
                }
            }
            .login-btn {
                .van-button--info {
                    color: #fff;
                    background-color: $color_active;
                    border: 1px solid $color_active;
                }
            }
        }
    }
}
</style>