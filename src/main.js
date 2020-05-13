// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMDCAdapter from 'vue-mdc-adapter'

import utils from './utils'


Vue.config.productionTip = false
Vue.use(VueMDCAdapter)
Vue.filter("toStr" ,(e)=>e+'')

export const globalStore = new Vue({
  data: {
    cards: JSON.parse(localStorage.getItem("cards")) || [],
    config: JSON.parse(localStorage.getItem("config")) || {salaire:"2500",epargnePerMonth:"0.6", dateDebut: new Date(), dateFin: new Date()},
    transactions: JSON.parse(localStorage.getItem("transactions")) || []
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
  	},
    transactions:{
      handler(newVal){
      localStorage.setItem("transactions",JSON.stringify(newVal));

      },
      deep:true
    }
  }
})
globalStore.config.epargne=()=> parseFloat(globalStore.config.epargnePerMonth) < 1 && parseFloat(globalStore.config.epargnePerMonth) > 0 ? parseFloat(globalStore.config.salaire)*parseFloat(globalStore.config.epargnePerMonth) :   parseFloat(globalStore.config.epargnePerMonth);
Vue.prototype.$globalStore=globalStore;
Vue.prototype.$utils=utils;

Vue.component("datepicker", window.vuejsDatepicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
