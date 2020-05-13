<template>
	<div class="nav-container">
		<van-tabbar v-model="navIdx">
			<van-tabbar-item
				v-for="(item, index) in navList"
				:key="index"
				:name="item.link"
				:icon="item.icon"
				@click="handleNav(item)"
			>
				{{ item.name }}
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: 'navBar',
	data () {
		return {
			// 默认首页
			navIdx: "Home",
			navList: [
				{ name: '首页', icon: 'home-o', link: 'Home'},
				{ name: '订单', icon: 'orders-o', link: 'Order' },
				{ name: '我的', icon: 'user-o', link: 'UserCenter' }
			]
		}
	},
	created () {
		this.navIdx = this.$route.name
	},
	methods: {
		handleNav (item) {
			if (this.$route.name == item.link) return;
			this.$router.push({ name: item.link })
		}
	},
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.nav-container{
	::v-deep .van-tabbar {
		height: $foot_px;
		.van-tabbar-item {
			color: $color_font;
			&--active {
				color: $color_active;
			}
		}
	}
}
</style>