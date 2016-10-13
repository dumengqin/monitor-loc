var unit = require("../../js/unit")
var bmap_config = require("../../js/config/bmap_style.json")
function series_config(geoCoordMap){
	var series = []

	series.push({
		name: geoCoordMap[0].name,
		type: 'lines',
		coordinateSystem: 'bmap',
		zlevel: 1,
		effect: {
			show: true,
			constantSpeed: 80,
			trailLength: 0.7,
			color: '#fff',
			symbolSize: 3
		},
		lineStyle: {
			normal: {
				color: unit.base_color,
				width: 0,
				curveness: 0.1
			}
		},
		data: unit.convert_map_data(geoCoordMap)
	}, {
		name: geoCoordMap[0].name,
		type: 'lines',
		coordinateSystem: 'bmap',
		zlevel: 2,
		lineStyle: {
			normal: {
				color: unit.base_color,
				width: 1,
				opacity: 1,
				curveness: 0.1
			}
		},
		data: unit.convert_map_data_2(geoCoordMap)
	}, {
		name: geoCoordMap[0].name,
		type: 'effectScatter',
		coordinateSystem: 'bmap',
		zlevel: 2,
		rippleEffect: {
			brushType: 'stroke'
		},
		label: {
			normal: {
				show: true,
				position: 'right',
				formatter: '{b}'
			}
		},
		symbolSize: 15,
		itemStyle: {
			normal: {
				color: unit.base_color
			}
		},
		data: unit.convert_map_data_3(geoCoordMap)
	})
	return series
}

function option_config(geoCoordMap){
	return {
		// 加载 bmap 组件
		bmap: {
			// 百度地图中心经纬度
			center: geoCoordMap[0].coord,
			// 百度地图缩放
			zoom: 6,
			// 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
			roam: true,
			// 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
			mapStyle: bmap_config
		},
		title: {
			text: '云眼智能边坡监测系统',
			left: 'center',
			textStyle: {
				color: '#fff'
			},
			padding: 50
		},
		tooltip: {
			trigger: 'item'
		},
		series: series_config(geoCoordMap)
	}	
}
module.exports = {option_config}