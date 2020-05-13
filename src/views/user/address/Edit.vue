<template>
    <div class="edit-container">
        <van-address-edit
            :address-info="addressInfo"
            :area-list="areaList"
            :show-delete="!isAdd"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import areaList from '@/utils/address'
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            isAdd: false,
            areaList,
            searchResult: [],
            addressInfo: {},
        }
    },
    computed: {
        ...mapState({
            addressList: state => state.userStore.addressList
        }),
    },
    created () {
        let id = this.$route.query.id
        this.$route.meta.title = id ? '编辑收货地址' : '添加收货地址'
        this.isAdd = id ? false : true

        this.addressInfo = this.addressList.find(r => r.id == id) || {}


        // 测试
        // let temp =  {
        //     addressDetail: "123",
        //     areaCode: "110102",
        //     city: "北京市",
        //     country: "",
        //     county: "西城区",
        //     isDefault: true,
        //     name: "test1",
        //     postalCode: "",
        //     province: "北京市",
        //     tel: "13412341234"
        // }
        // this.addressAction(temp)
    },
    methods: {
        ...mapActions([
            'addressAction',
            'editAddress',
            'delAddress'
        ]),
        onSave (info) {
            info.address = `${info.province}${info.city}${info.county} ${info.addressDetail}`
            // 添加
            if (this.isAdd) {
                // 生成唯一id
                info.id = Date.parse(new Date).toString()
                this.addressAction(info)
            } else {
                this.editAddress(info)
            }
            this.$router.push({ path: '/address' })
        },
        onDelete (item) {
            this.delAddress(item.id)
            this.$router.push({ path: '/address' })
        },
        onChangeDetail (val) {
            if (val) {
                this.searchResult = [
                    {
                        name: '黄龙万科中心',
                        address: '杭州市西湖区',
                    },
                    {
                        name: '阿西巴巴园区',
                        address: '杭州市西湖区',
                    }
                ];
            } else {
                this.searchResult = [];
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.edit-container {
    ::v-deep .van-address-edit {
        .van-switch--on {
            background-color: $color_active;
        }
        .van-button--danger {
            background-color: $color_active;
            border-color: $color_active;
        }
    }
}
</style>