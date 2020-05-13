<template>
	<div class="godsList-box">
		<div :class="['goodsList-container', {'visible': visible }, {'active': carCount > 0}]">
			<div class="goodsList-icon" @click="handleCar()">
				<div class="icon-badge" v-if="carCount > 0">{{ carCount }}</div>
			</div>
			<div class="goodsList-btn">
				<div class="btn-price">
					￥{{ totalAmount | formatMoney }}
				</div>
				<div class="btn-commit" @click="commitPay()">去结算</div>
			</div>
			
		</div>
		<!-- 购物车 -->
		<GoodsCar :visible="visible" @close="handleCar" />
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import GoodsCar from './GoodsCar'
export default {
	components: {
		GoodsCar,
	},
	data () {
		return {
			visible: false
		}
	},
	computed: {
        ...mapGetters([
			'carlists',
			'carCount',
			'totalAmount'
		])
	},
	methods: {
		...mapMutations(['setModelStatus']),
		handleCar () {
			if (this.carCount < 1) {
				this.visible = false
			} else {
				this.visible = !this.visible
			}
			// 让body滚动条失效
			this.setModelStatus(this.visible)
		},
		// 去结算
		commitPay () {
			if (this.carCount < 1) return;
			this.$router.push({ 
				path: '/goodsPay',
				query: this.$route.query
			})
		}
	},
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';
.goodsList-container {
	position: fixed;
	left: 0;
	bottom: 0;
	@include setBox(100%, $foot_px);
	z-index: 99;
	&.visible {
		height: 70px;
		padding-top: 15px;
		background: #ccc;
	}
	&.active {
		.goodsList-icon,
		.goodsList-btn .btn-commit {
			background-color: $color_active;
			color: #fff;
		}
	}
	.goodsList-icon {
		position: absolute;
		@include setBox($foot_px, $foot_px);
		border-radius: 50%;
		bottom: 10px;
		left: 15px;
		background: url('~@/assets/img/icon/cat-icon-1.png') no-repeat;
		background-size: 50%;
		background-position: 50% 50%;
		// background-color: $color_active;
		background-color: #828282;
		.icon-badge {
			position: absolute;
			right: -10px;
			top: 4px;
			@include setBox(20px, 20px);
			border-radius: 50%;
			background: #8b4413;
			color: #fff;
			font-size: 12px;
			line-height: 20px;
		}
	}
	.goodsList-btn {
		padding-left: 85px;
		padding-right: 12px;
		height: $foot_px;
		color: #fff;
		font-size: $font_h;
		@include flexBox(space-between);
		background: #3d3e42;
		.btn-price {
			font-size: $font_max;
		}
		.btn-commit {
			@include flexBox();
			@include setBox(100px, $head_px);
			// background: $color_active;
			background-color: #2b2a2a;
			color: #ccc;
			border-radius: 5px;
		}
	}
}
</style>