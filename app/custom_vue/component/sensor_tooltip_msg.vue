<style lang="less" scoped>
	@import "../../css/base";
	svg {
		position: absolute;
		display: none;
	}
	
	.sensor-tooltip-msg {
		background: linear-gradient(rgba(0, 71, 70, .4), #111111);
		border: 1px solid @color_normal;
		position: absolute;
		top: 100px;
		left: 100px;
		width: 200px;
		color: fade(@color_normal, 100%);
		display: none;
		padding: 5px;
		z-index: 10;
	}
	
	.sensor-tooltip-msg img {
		width: 100%;
		margin-bottom: 10px;
	}
	
	.sensor-tooltip-msg .badge {
		position: absolute;
		right: 5px;
		top: 5px;
	}
	
	.sensor-tooltip-msg.box-glow.normal {
		border: 1px solid @color_normal;
		animation: fadeInDown 1s, box-glow-normal 3s infinite ease-in-out;
	}
	
	.sensor-tooltip-msg.box-glow.warning {
		border: 1px solid @color_normal;
		animation: fadeInDown 1s, box-glow-warning 1s infinite ease-in-out;
	}
	
	.sensor-tooltip-msg.box-glow.normal .badge {
		background-color: fade(@color_normal, 50%);
		animation: box-glow-normal 3s infinite ease-in-out;
	}
	
	.sensor-tooltip-msg.box-glow.warning .badge {
		background-color: fade(@color_warning, 50%);
		animation: box-glow-warning 3s infinite ease-in-out;
	}
</style>
<template>
	<div>
		<svg>
			<path ref="mypath" class="path" fill="transparent" stroke="rgba(0, 255, 253, .8)" stroke-width="2" stroke-miterlimit="10" d="M100,100 50,50 0,50" />
		</svg>
		<div ref="sensor_tooltip_msg" class="sensor-tooltip-msg box-glow normal">
			<img src="../../img/figure.jpg">
			<div><i class="iconfont">&#xe608;</i> ：隧道入口左侧地表裂缝</div>
			<div><i class="iconfont">&#xe60a;</i> ：(0.387,0.285)°</div>
			<div><i class="iconfont">&#xe604;</i> ：09-20 09:39</div>
			<div><i class="iconfont">&#xe600;</i> ：高精度固定式测斜仪</div>
			<span class="badge normal">normal</span>
		</div>
	</div>
</template>
<script>
	var segment

	module.exports = {
		name: 'sensor_tooltip_msg22',
		mounted: function() {
			var Segment = require('segment-js')
			segment = new Segment(this.$refs.mypath)
		},
		methods: {
			show: function(el) {
				segment.draw("0%", "0%", 0)
				$(this.$refs.sensor_tooltip_msg).hide()
				$(this.$refs.mypath).parent().show()

				var tooltip_width = 300
				var tooltip_height = 325

				var offsetLeft = el.offsetLeft
				var offsetTop = el.offsetTop
				var offsetWidth = el.offsetWidth
				var offsetHeight = el.offsetHeight
				var sensor_tooltip_msg_el = this.$refs.sensor_tooltip_msg
				//判定显示在焦点元素的左边还是右边
				if((document.body.offsetWidth - offsetLeft - offsetWidth) >= tooltip_width) { //右上
					$(this.$refs.mypath).attr("d", "M0,50 50,0 100,0")
					$(this.$refs.mypath).parent().css("left", offsetLeft + offsetWidth)
					$(this.$refs.mypath).parent().css("top", offsetTop - 50)

					segment.draw("0%", "100%", 0.2, {
						callback: function() {
							$(sensor_tooltip_msg_el).css("left", offsetLeft + offsetWidth + 100)
							$(sensor_tooltip_msg_el).css("top", offsetTop - 100)
							$(sensor_tooltip_msg_el).show()
						}
					})
				} else if(offsetLeft >= tooltip_width) { //左上
					$(this.$refs.mypath).attr("d", "M100,50 50,0 0,0")
					$(this.$refs.mypath).parent().css("left", offsetLeft - 100)
					$(this.$refs.mypath).parent().css("top", offsetTop - 50)
					segment.draw("0%", "100%", 0.2, {
						callback: function() {
							$(sensor_tooltip_msg_el).css("left", offsetLeft - 300)
							$(sensor_tooltip_msg_el).css("top", offsetTop - 100)
							$(sensor_tooltip_msg_el).show()
						}
					})
				}
			},
			hide: function() {

				$(this.$refs.sensor_tooltip_msg).hide(500)
				var el = this.$refs.mypath
				segment.draw("0%", "0%", 0.5, {
					callback: function() {
						$(el).parent().hide()
					}
				})
			}
		}
	}
</script>