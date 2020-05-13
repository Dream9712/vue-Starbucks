<template>
    <div class="banner-container">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item
                v-for="(item, index) in list"
                :key="index"
            >
                <img :src="item.src" alt="">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    name: 'Banner',
    props: {
        list: {
            type: Array,
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.banner-container{
    height: 100%;
    ::v-deep .my-swipe {
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>