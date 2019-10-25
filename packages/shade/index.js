import Vue from 'vue';
import shade from './src/shade.vue';
//全局注册蒙版
var shades = Vue.extend(shade);
//蒙版的方法以及属性
let zIndex = 1111;
let elements = [];
export default {
	show(el,config){
		//设置蒙版
		var globalConfig = {};
		var vEl = new shades();
		zIndex++;
		vEl.zIndex = zIndex;
		var shadeEl = vEl.$mount().$el;
		var div = document.createElement('div');
		shadeEl.appendChild(div);
		if(el){
			//设置传入的组件
			var componentEl = Vue.extend(el);
			var vm = new componentEl({
			    el: div,
			    propsData: config || {}
		 });
		}
	  	document.body.appendChild(shadeEl);
		elements.push(shadeEl);
		return this;	
	},
	hide(c){
		//允许回调
		var len = elements.length;
		//优先回调
		c && c();
		//删除蒙版从最外层开始删,每调用一次删除最外层一层蒙版
		if (len > 0) {
			var el = elements[len - 1];
			document.body.removeChild(el);
			elements.splice(len - 1, 1);
			zIndex--;
		}
		return this;
	},
	hideAll(c){
		//允许回调
		var len = elements.length;
		//优先回调
		c && c();
		//删除蒙版从最外层开始删,每调用一次删除最外层一层蒙版
		if (len > 0) {
			elements.forEach((val,index) => {
				document.body.removeChild(val);
				elements.splice(index, 1);
				zIndex--;
			});
		}
		return this;
	}
}
