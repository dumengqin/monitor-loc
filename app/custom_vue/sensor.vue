<style lang="less" scoped>
	@import "../css/base";
	.mask {
		width: 100vw;
		height: 100vh;
		margin: 0px auto;
		vertical-align: middle;
	}
	
	.sensor-tooltip {
		position: absolute;
		width: 2vw;
		height: 2vw;
	}
	
	.sensor-data-main {
		position: relative;
		width: 100vw;
		height: 100vh;
		z-index: 10;
		display: table-cell;
		vertical-align: middle;
	}
	
	.sensor-data {
		width: 0vw;
		height: 0vh;
		margin: 0px auto;
		background: linear-gradient(rgba(0, 71, 70, .4), #111111);
		border: 1px solid @color_normal;
		color: fade(@color_normal, 80%);
		padding: 5px;
		transition: all 1s;
		z-index: 1000;
	}
	
	.sensor-data:hover {
		opacity: 1;
	}
	
	.sensor-data-target-width {
		width: 70vw;
	}
	
	.sensor-data-target-height {
		height: 60vh;
	}
	
	.sensor-data-target-opacity {
		opacity: .2;
	}
	
	.sensor-data.box-glow.normal {
		animation: box-glow-normal 3s infinite ease-in-out;
	}
	
	.sensor-data.box-glow.warning {
		animation: box-glow-warning 1s infinite ease-in-out;
	}
	
	.content {
		opacity: 0;
		transition: all 1s;
	}
	
	.content.display {
		opacity: 1 !important;
	}
	
	.dropdown-menu a {
		cursor: pointer;
	}
	
	.form-control[readonly] {
		cursor: pointer;
	}
	
	.form-control[type='text'] {
		width: 110px;
	}
	
	.form-inline {
		text-align: center;
	}
	
	.dropdown-menu {
		background: linear-gradient(rgba(0, 71, 70, .4), #111111);
		border: 1px solid rgba(0, 255, 253, 0.5);
	}
	
	.datachart {
		height: 50vh;
	}
</style>

<template>
	<div>
		<background></background>
		<div class="mask" v-resize="drawchart">
			<div ref="sensor_tooltip" class="sensor-tooltip" style="top: 36%;left: 49%;">
				<sensor_tooltip>
				</sensor_tooltip>
			</div>
			<sensor_tooltip_msg ref="sensor_tooltip_msg_1"></sensor_tooltip_msg>
			<div class="sensor-data-main">
				<div class="sensor-data box-glow normal">
					<div class="content">
						<div class="form-inline">
							<div class="form-group">
								<label for="txt_query_dt">查询范围：</label>
								<input ref="start_dt" type="text" class="form-control" v-model="start_dt" placeholder="选择开始日期" readonly> —
								<input ref="end_dt" type="text" class="form-control" v-model="end_dt" placeholder="选择结束日期" readonly>
								<div class="btn-group">
									<div type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
										<span ref="datatype">非误报</span> <span class="caret"></span>
									</div>
									<ul class="dropdown-menu" role="menu">
										<li>
											<a v-on:click="changeType"> 非误报</a>
										</li>
										<li>
											<a v-on:click="changeType"> 仅正常</a>
										</li>
										<li>
											<a v-on:click="changeType"> 仅误报</a>
										</li>
										<li>
											<a v-on:click="changeType"> 全部</a>
										</li>
									</ul>
								</div>
							</div>
							<div type="button" class="btn btn-default dropdown-toggle">
								查询
							</div>
							<div type="button" class="btn btn-default dropdown-toggle">
								导出
							</div>
						</div>
						<div ref='datachart' class="datachart"></div>
					</div>
				</div>
			</div>
		</div>
		<back_btn></back_btn>
	</div>
</template>
<script>
	var back_btn = require('./component/back_btn.vue')
	var background = require('./component/background.vue')
	var sensor_tooltip = require('./component/sensor_tooltip.vue')
	var sensor_tooltip_msg = require('./component/sensor_tooltip_msg.vue')
	var unit = require("../js/unit")

	require("moment")
	require("bootstrap-datepicker")
	require("bootstrap-datepicker/dist/css/bootstrap-datepicker.css")
	require("bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min")

	var echarts = require('echarts')
	var data = [];
	var now = +new Date(1997, 9, 3)
	var oneDay = 24 * 3600 * 1000
	var value = Math.random() * 1000
	var isFirst = true
		// 指定图表的配置项和数据
	var option = {
		title: {
			text: ''
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params) {
				params = params[0]
				var date = new Date(params.name)
				return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
			},
			axisPointer: {
				animation: false,
				lineStyle: {
					color: unit.base_color
				}
			}
		},
		xAxis: {
			type: 'time',
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: unit.base_color
				}
			}
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%'],
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: unit.base_color
				}
			}
		},
		series: [{
			name: '模拟数据',
			type: 'line',
			showSymbol: false,
			hoverAnimation: false,
			data: data,
			smooth: true,
			lineStyle: {
				normal: {
					color: unit.base_color
				}
			}
		}]
	};

	function randomData() {
		now = new Date(+now + oneDay)
		value = value + Math.random() * 21 - 10
		return {
			name: now.toString(),
			value: [
				[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
				Math.round(value)
			]
		}
	}
	module.exports = {
		components: {
			'back_btn': back_btn,
			'sensor_tooltip': sensor_tooltip,
			'sensor_tooltip_msg': sensor_tooltip_msg,
			'background': background
		},
		data: function() {
			return {
				start_dt: new Date().Format("yyyy-MM-dd"),
				end_dt: new Date().addDate(1).Format("yyyy-MM-dd"),
			}
		},
		methods: {
			drawchart: function() {
				var datachart = this.$refs.datachart
				var sensor_tooltip = this.$refs.sensor_tooltip
				var sensor_tooltip_msg_vm = this.$refs.sensor_tooltip_msg_1
				if(datachart !== undefined) {
					clearTimeout(window.drawchart_timeout)

					window.drawchart_timeout = setTimeout(function() {
						if(!isFirst) {
							var myChart = echarts.init(datachart)
							data.length = 0;
							for(var i = 0; i < 1000; i++) {
								data.push(randomData())
							}
							myChart.setOption(option)
						}

						sensor_tooltip_msg_vm.show(sensor_tooltip)
					}, 800)
				}
			},
			changeType: function(e) {
				this.$refs.datatype.innerText = e.currentTarget.outerText
			}
		},
		mounted: function() {
			$(".sensor-tooltip-img").addClass("bounceIn")
			setTimeout(function() {
				$(".sensor-tooltip-img,.sensor-tooltip-aperture,.sensor-tooltip-aperture-2").addClass("box-glow")
			}, 1000)
			setTimeout(function() {
				$(".sensor-data").addClass("sensor-data-target-width")
			}, 50)
			setTimeout(function() {
				$(".sensor-data").addClass("sensor-data-target-height")
			}, 900)
			setTimeout(function() {
				$(".sensor-data").addClass("sensor-data-target-opacity")
			}, 3000)
			setTimeout(function() {
				$(".content").addClass("display")
			}, 1500)

			var drawchart = this.drawchart
			setTimeout(function() {
				isFirst = false;
				drawchart()
			}, 1000)

			var now_dt = new Date()
			$([this.$refs.start_dt, this.$refs.end_dt]).datepicker({
				language: "zh-CN",
				format: "yyyy-mm-dd"
			}).on('changeDate', function(ev) {
				$(this).datepicker("hide")
			})
		}
	}
</script>