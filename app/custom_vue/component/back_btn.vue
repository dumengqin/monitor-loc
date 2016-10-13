<style lang="less" scoped>
	@import "../../css/base";
	.back-btn {
		position: fixed;
		border-radius: 50%;
		width: 3vw;
		height: 3vw;
		font-size: 3vw;
		color: @color_normal;
		top: 3vw;
		left: 3vw;
		z-index: 99;
		opacity: .6;
		cursor: pointer;
		transition: all .5s;
	}
	
	.back-btn:hover {
		opacity: 1;
	}
</style>
<template>
	<i class="iconfont back-btn" title="后退" v-on:click="back">
		&#xe612;
	</i>
</template>
<script>
	module.exports = {
		methods: {
			back: function() {
				this.$router.go(-1)
			}
		}
	}
</script>