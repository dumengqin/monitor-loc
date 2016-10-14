<style>
	.map {
		height: 100vh;
		width: 100vw;
	}
</style>
<template>
	<div ref="map" class="map" v-resize="resize"></div>
</template>
<script>
	var unit = require("../js/unit")

	var echarts = require('echarts')
	var BMAP = require('echarts/extension/bmap/bmap')
	
	//测试数据
	var geoCoordMap = require('../js/config/map_test_data')
	
	//生成echart配置项
	var _option = require('../js/config/bmap_option_config')
	
	var option=_option.option_config(geoCoordMap)

	var router, myChart
	module.exports = {
		methods: {
			resize: function() {
				setTimeout(function() {
					myChart.resize()
				}, 100)
			}
		},
		mounted: function() {
			router = this.$router
			myChart = echarts.init(this.$refs.map)
			myChart.setOption(option)
			//添加echart点击事件
			myChart.on('click', function(params) {
				if(params.componentType === 'series' && params.seriesType === 'effectScatter') {
					//导航到monitor页面
					router.push({
						name: 'monitor'
					})
				}
			})
			var bmap = myChart.getModel().getComponent('bmap').getBMap()
			bmap.setMinZoom(5)

				//改变地图容器背景色
			bmap.getContainer().style.backgroundColor = unit.background_color
		}
	}
</script>
