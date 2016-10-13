// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	}
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
	return fmt
}
Date.prototype.addDate = function(days) {
	var a = this.valueOf() + days * 24 * 60 * 60 * 1000
	return new Date(a)
}
var base_color = "#6eeaff"
var background_color = "#054d85"
var normal_color = "#6eeaff"
var warning_color = "#ff0000"

function convert_map_data(data) {
	var res = []
	for(var i = 1; i < data.length; i++) {
		res.push({
			fromName: data[i].name,
			toName: data[0].name,
			coords: [data[i].coord, data[0].coord]
		})
	}
	return res
}

function convert_map_data_2(data) {
	var res = []
	for(var i = 1; i < data.length; i++) {
		res.push({
			fromName: data[0].name,
			toName: data[i].name,
			coords: [data[i].coord, data[0].coord],
			lineStyle: {
				normal: {
					color: data[i].state === 0 ? normal_color : warning_color
				}
			},
		})
	}
	return res
}

function convert_map_data_3(data) {
	var res = []
	data.forEach(function(item) {
		res.push({
			name: item.name,
			value: item.coord,
			itemStyle: {
				normal: {
					color: item.state === 0 ? normal_color : warning_color
				}
			},
		})
	})
	return res
}
module.exports = {
	base_color,
	background_color,
	normal_color,
	warning_color,
	convert_map_data,
	convert_map_data_2,
	convert_map_data_3
}