
import 'bootstrap/dist/css/bootstrap.css'
import 'fullpage.js/jquery.fullPage.css'
import './css/iconfont.css'
import './css/animate.min.css'
import './css/main.less'

import 'bmapapi'
import 'bootstrap'
import Vue from 'vue'
import VueRouter from 'vue-router'

import monitor from './custom_vue/monitor.vue'
import sensor from './custom_vue/sensor.vue'
import map from './custom_vue/map.vue'

Vue.use(VueRouter)
//自定义指令
Vue.directive('resize', {
	bind: function(el, binding, vnode) {
		el.handler = vnode.context[binding.expression]
		window.addEventListener('resize', el.handler)
	},
	unbind: function(el, binding, vnode) {
		window.removeEventListener('resize', el.handler)
	}
})

const router = new VueRouter({
	routes: [{
		path: '/monitor',
		name: 'monitor',
		component: monitor
	}, {
		path: '/sensor',
		name: 'sensor',
		component: sensor
	}, {
		path: '*',
		name: 'map',
		component: map
	}]
})

const app = new Vue({
	router: router,
	data: {
		transitionName: 'my-fade'
	},
	watch: {
		'$route': function(to, from) {
			//根据路径设置每个页面的转场动画
			if(from.name === 'map' && to.name === 'monitor') {
				this.transitionName = 'my-fade'
			} else if(from.name === 'monitor' && to.name === 'sensor') {
				this.transitionName = ''
			} else if(from.name === 'sensor' && to.name === 'monitor') {
				this.transitionName = ''
			} else if(from.name === 'monitor' && to.name === 'map') {
				this.transitionName = 'my-fade'
			}
		}
	}
}).$mount('#app')