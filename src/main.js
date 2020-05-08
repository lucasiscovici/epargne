// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMDCAdapter from 'vue-mdc-adapter'

Vue.config.productionTip = false
Vue.use(VueMDCAdapter)
Vue.filter("toStr" ,(e)=>e+'')
export const globalStore = new Vue({
  data: {
    cards: JSON.parse(localStorage.getItem("cards")) || [],
    config: JSON.parse(localStorage.getItem("config")) || {epargne:"0",epargnePerMonth:"100"}
  },
  watch : {
  	cards:{
  		handler(newVal){
  		localStorage.setItem("cards",JSON.stringify(newVal));

  		},
  		deep:true
  	},
  	config:{
  		handler(newVal){
  		localStorage.setItem("config",JSON.stringify(newVal));

  		},
  		deep:true
  	}
  }
})
Vue.prototype.$globalStore=globalStore;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
