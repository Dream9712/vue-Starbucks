<template>
    <div class="address-container">
        <van-address-list
            v-model="addressId"
            :list="addressList"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script>
import { mapState, mapMutaions, mapActions } from 'vuex' 
export default {
    data () {
        return {
            addressId: ''
        }
    },
    computed: {
        ...mapState({
            addressList: state => state.userStore.addressList
        }),
    },
    watch: {
        addressId (val) {
            this.selectAddress(val)
        }
    },
    created () {
        if (this.addressList.length > 0) {
            let result = this.addressList.filter(r => r.isDefault)[0] || {}
            this.addressId = result.id || ''
            // 没有默认地址 就默认第一个
            if (!this.addressId) {
                this.selectAddress(this.addressList[0].id)
            }
        }
    },
    methods: {
        ...mapActions(['selectAddress']),
        onAdd() {
            this.$router.push({ path: '/editAddress' })
        },
        onEdit(item, index) {
            this.$router.push({
                path: '/editAddress',
                query: {
                    id: item.id
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.address-container {
    height: calc(100vh - 44px);
    background: #f6f6f6;
    ::v-deep .van-address-list {
        .van-address-list__bottom {
            padding: 10px;
            button {
                background-color: $color_active;
                border-color: $color_active;
            }
        }
        .van-address-item {
            .van-radio__icon {
                &--checked .van-icon {
                    background-color: $color_active;
                    border-color: $color_active;
                }
            }
        }
    }
}
</style>