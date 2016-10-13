<style lang="less" scoped>
	@import "../../css/base";
	.sensor-tooltip-img {
		z-index: 2;
		width: 2vw;
		border-radius: 50%;
		position: absolute;
		opacity: 0;
		border: 1px solid transparent;
		box-shadow: 0 0 30px transparent;
		transition: all 1s;
	}
	
	.sensor-tooltip-img.box-glow.normal {
		opacity: 1;
		animation: box-glow-normal 3s infinite ease-in-out;
	}
	
	.sensor-tooltip-img.box-glow.warning {
		opacity: 1;
		animation: box-glow-warning 1s infinite ease-in-out;
	}
	
	.sensor-tooltip-aperture,
	.sensor-tooltip-aperture-2 {
		z-index: 1;
		width: 2vw;
		height: 2vw;
		opacity: 0;
		position: absolute;
		border-radius: 50%;
	}
	
	.sensor-tooltip-aperture.box-glow.normal {
		background-color: @color_normal;
		box-shadow: 0 0 30px @color_normal;
		animation: aperture 2s linear 0s infinite;
	}
	
	.sensor-tooltip-aperture-2.box-glow.normal {
		background-color: @color_normal;
		box-shadow: 0 0 30px @color_normal;
		animation: aperture 2s linear 1.1s infinite;
	}
	
	.sensor-tooltip-aperture.box-glow.warning {
		background-color: @color_warning;
		box-shadow: 0 0 30px @color_warning;
		animation: aperture 2s linear 0s infinite;
	}
	
	.sensor-tooltip-aperture-2.box-glow.warning {
		background-color: @color_warning;
		box-shadow: 0 0 30px @color_warning;
		animation: aperture 2s linear 1.1s infinite;
	}
</style>
<template>
	<div>
		<img class="sensor-tooltip-img normal animated" src="http://static.cloudeyes.cn/figure.jpg">
		<div class="sensor-tooltip-aperture normal"></div>
		<div class="sensor-tooltip-aperture-2 normal"></div>
	</div>
</template>