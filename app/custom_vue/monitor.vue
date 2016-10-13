<style lang="less" scoped>
	@import "../css/base";
	.monitor-info {
		background: linear-gradient(rgba(0, 71, 70, .4), #111111);
		border: 1px solid @color_normal;
		color: fade(@color_normal, 100%);
		border-radius: 5px;
		position: relative;
		width: 25vw;
		transition: 1s all;
		padding: 30px;
		font-size: 1.1vw;
		margin: 5px auto;
		line-height: 3vw;
		opacity: 0;
	}
	
	.monitor-info .title {
		text-align: center;
		margin: 0px 0px 10px 0px;
		font-size: 1.4vw;
	}
	
	.monitor-info.box-glow.normal {
		opacity: 1;
		animation: fadeInDown 1s, box-glow-normal 3s infinite ease-in-out;
	}
	
	.monitor-info.box-glow.warning {
		opacity: 1;
		animation: fadeInDown 1s, box-glow-warning 1s infinite ease-in-out;
	}
	
	.sensor-list {
		background: linear-gradient(rgba(0, 71, 70, .4), #111111);
		border: 1px solid @color_normal;
		color: fade(@color_normal, 80%);
		border-radius: 5px;
		width: 80vw;
		margin: 20px auto;
		transition: 1s all;
		font-size: 1.1vw;
		line-height: 3vw;
		opacity: 0;
		padding: 5px;
	}
	
	.sensor-list .wrapper {
		height: 30vh;
		overflow-x: hidden;
	}
	
	.sensor-list img {
		width: 70%;
		border-radius: 2px;
		margin: 5px;
		border: 1px solid fade(@color_normal, 50%);
	}
	
	.sensor-list.box-glow.normal {
		opacity: 1;
		animation: bounceInRight 1s, box-glow-normal 3s ease-in-out .5s infinite forwards;
	}
	
	.sensor-list.box-glow.warning {
		opacity: 1;
		animation: bounceInRight 1s, box-glow-warning 1s ease-in-out .5s infinite forwards;
	}
	
	.monitor-info .badge {
		position: absolute;
		right: 5px;
		top: 5px;
	}
	
	.monitor-info.box-glow.normal .badge,
	.row.normal .badge {
		background-color: fade(@color_normal, 50%);
		animation: box-glow-normal 3s infinite ease-in-out;
	}
	
	.monitor-info.box-glow.warning .badge,
	.row.warning .badge {
		background-color: fade(@color_warning, 50%);
		animation: box-glow-warning 3s infinite ease-in-out;
	}
	
	.sensor-list .row {
		text-align: center;
		color: fade(@color_normal, 80%);
		border-bottom: 1px solid transparent;
	}
	
	.sensor-list .row:hover {
		color: @color_normal !important;
		cursor: pointer;
		font-weight: bold;
		border-bottom: 1px solid @color_normal;
	}
	
	.sensor-tooltip {
		position: absolute;
		width: 2vw;
		height: 2vw;
		transition: all 1s;
	}
</style>
<template>
	<transition name="my-fade">
		<div v-resize="reshow">
			<background></background>
			<div ref="monitor_info">
				<!--<div class="section">
				</div>-->
				<div class="section">
					<div style="position: relative;height: 100%;">
						<router-link :to="{name: 'sensor'}" v-for="sensor_tooltip_item in sensor_tooltip_list" class="sensor-tooltip" v-bind:style="{top: sensor_tooltip_item.x+'%',left: sensor_tooltip_item.y+'%'}">
							<sensor_tooltip>
							</sensor_tooltip>
						</router-link>
						<sensor_tooltip_msg ref="sensor_tooltip_msg_1"></sensor_tooltip_msg>
					</div>
				</div>
				<div class="section">
					<div class="monitor-info animated normal">
						<div class="title">澜湾子地表位移监测点</div>
						<div><i class="iconfont">&#xe600;</i> ：
							<div style="margin: -3vw 0vw 0vw 3vw; ">
								高精度激光测距仪（5个）<br/>高精度测斜仪（3个）<br/>节点（2个）<br/>节点（2个）
							</div>
						</div>
						<div><i class="iconfont">&#xe608;</i> ：
							<div style="display: inline-block;">
								西藏林芝地区工布江达县
							</div>
						</div>
						<span class="badge">normal</span>
					</div>
					<div class="sensor-list animated normal">
						<div ref="wrapper" class="wrapper">
							<div ref="scroll_bar">
								<router-link :to="{name:'sensor'}" class="row normal" v-for="sensor_tooltip_item in sensor_tooltip_list">
									<div class="col-lg-1 col-md-1 hidden-sm hidden-xs"><img :src="sensor_tooltip_item.img"></div>
									<div class="col-lg-3 col-md-3 col-sm-4  col-xs-4">{{sensor_tooltip_item.addr}}</div>
									<div class="col-lg-2 col-md-2 col-sm-2  col-xs-3">{{sensor_tooltip_item.data}}</div>
									<div class="col-lg-2 col-md-2 col-sm-2  col-xs-3">{{sensor_tooltip_item.date}}</div>
									<div class="col-lg-1 col-md-1 col-sm-1  col-xs-1"><span class="badge">{{sensor_tooltip_item.state}}</span></div>
									<div class="col-lg-3 col-md-3 col-sm-3 hidden-xs">{{sensor_tooltip_item.sensor_type}}</div>
									<div class="spline"></div>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<back_btn></back_btn>
		</div>
	</transition>
</template>
<script>
	var unit = require("../js/unit")
		//载入所需组件
	var back_btn = require('./component/back_btn.vue')
	var background = require('./component/background.vue')
	var sensor_tooltip = require('./component/sensor_tooltip.vue')
	var sensor_tooltip_msg = require('./component/sensor_tooltip_msg.vue')

	var sensor_tooltip_msg_vm, sensor_tooltip_now
	module.exports = {
		data: function() {
			return {
				sensor_tooltip_list: [{
					x: 26,
					y: 39,
					img: 'http://static.cloudeyes.cn/0627110728987QQ%E5%9B%BE%E7%89%8720160624162df945.jpg-66.50',
					addr: '地表位移(1-1)',
					data: '1.234 mm',
					date: '09-20 09:39',
					state: 'normal',
					sensor_type: '节点'
				}, {
					x: 16,
					y: 49,
					img: 'http://static.cloudeyes.cn/0627110728987QQ%E5%9B%BE%E7%89%8720160624162df945.jpg-66.50',
					addr: '测斜仪(2-1)',
					data: '(0.387,0.285)°',
					date: '09-20 09:39',
					state: 'normal',
					sensor_type: '高精度固定式测斜仪'
				}, {
					x: 33,
					y: 44,
					img: 'http://static.cloudeyes.cn/0627110728987QQ%E5%9B%BE%E7%89%8720160624162df945.jpg-66.50',
					addr: '雨量计',
					data: '20 mm',
					date: '09-20 09:39',
					state: 'normal',
					sensor_type: '降雨量观测系统'
				}, {
					x: 58,
					y: 29,
					img: 'http://static.cloudeyes.cn/0627110728987QQ%E5%9B%BE%E7%89%8720160624162df945.jpg-66.50',
					addr: '激光(1-2)',
					data: '0.026 cm',
					date: '09-20 09:39',
					state: 'normal',
					sensor_type: '高精度激光变形观测仪'
				}, {
					x: 50,
					y: 80,
					img: 'http://static.cloudeyes.cn/0627110728987QQ%E5%9B%BE%E7%89%8720160624162df945.jpg-66.50',
					addr: '刘家沟监测系统',
					data: '',
					date: '09-20 09:39',
					state: 'normal',
					sensor_type: '图像采集系统'
				}, {
					x: 89,
					y: 74,
					img: 'http://static.cloudeyes.cn/0627110728987QQ%E5%9B%BE%E7%89%8720160624162df945.jpg-66.50',
					addr: '二级台阶左2-13-1 (313874)',
					data: '516.703 KN',
					date: '09-20 09:39',
					state: 'normal',
					sensor_type: '锚索测力计'
				}]
			}
		},
		//组件注册
		components: {
			'back_btn': back_btn,
			'background': background,
			'sensor_tooltip': sensor_tooltip,
			'sensor_tooltip_msg': sensor_tooltip_msg
		},
		methods: {
			reshow: function() {
				setTimeout(function() {
					sensor_tooltip_msg_vm.show(sensor_tooltip_now)
				}, 500)
			}
		},
		//mounted配置项为Vue 2.0新特性 ,详见:http://vuefe.cn/api/
		mounted: function() {
			//ref属性：不仅仅可以直接访问当前元素，还可以为子组件设置ref之后，访问子组件对象
			sensor_tooltip_msg_vm = this.$refs.sensor_tooltip_msg_1
			if($(this.$refs.monitor_info).fullpage === undefined) {
				require('fullpage.js')
			} else {
				$.fn.fullpage.destroy('all')
			}
			buildFullpage(this.$refs.monitor_info)

			//列表滚动条
			require('jquery.nicescroll')
			$(this.$refs.wrapper).niceScroll(this.$refs.scroll_bar, {
				cursorcolor: unit.base_color,
				horizrailenabled: false
			});

			$(".sensor-tooltip-img").mouseover(function() {
				sensor_tooltip_now = $(this).parents(".sensor-tooltip")[0]
				sensor_tooltip_msg_vm.show(sensor_tooltip_now)
			})
			$(".sensor-tooltip-img").mouseout(function() {
				sensor_tooltip_msg_vm.hide()
			})
		}
	}

	var sets = []

	function buildFullpage(el) {
		$(el).fullpage({
			afterLoad: function(anchorLink, index) {
				switch(index) {
					case 1:
						{
							removepage2()
							dhpage1()
						}
						break;
					case 2:
						{
							removepage1()
							dhpage2()
						}
						break
					default:
						break
				}
			},
			onLeave: function(index, nextIndex, direction) {
				//当鼠标处于传感器列表之上发生滚动翻页时，将阻止
				if(index === 2 && nextIndex === 1) {
					if($(window.event.target).parents(".sensor-list").length > 0) {
						return false
					}
				}
			}
		})
	}
	//页面切换动画
	function dhpage1() {

		$(".sensor-tooltip-img").addClass("fadeInUp")
		sets[0] = setTimeout(function() {
			$(".sensor-tooltip-img,.sensor-tooltip-aperture,.sensor-tooltip-aperture-2").addClass("box-glow")
		}, 1000)
		setTimeout(function() {
			sensor_tooltip_now = $(".sensor-tooltip")[0]
			sensor_tooltip_msg_vm.show(sensor_tooltip_now)
		}, 1500)

	}

	function removepage1() {
		clearTimeout(sets[0]);
		$(".sensor-tooltip-img").removeClass("fadeInUp")
		$(".sensor-tooltip-img,.sensor-tooltip-aperture,.sensor-tooltip-aperture-2").removeClass("box-glow")
		sensor_tooltip_msg_vm.hide()
	}

	function dhpage2() {
		$(".monitor-info").addClass("box-glow")
		setTimeout(function() {
			$(".sensor-list").addClass("box-glow")
		}, 500)
	}

	function removepage2() {
		$(".monitor-info,.sensor-list").removeClass("box-glow")
	}
</script>