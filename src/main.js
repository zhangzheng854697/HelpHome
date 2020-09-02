// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import layer from 'vue-layer'
import axios from 'axios'
import './assets/reset.css'
import store from './store/store.js'
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-layer/lib/vue-layer.css';
Vue.prototype.$axios = axios
Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(store)
/* eslint-disable no-new */
router.beforeEach((to,from ,next)=>{
	if(to.meta.title){
		document.title = to.meta.title
	}
	next();
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
