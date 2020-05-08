import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Projets from '@/pages/Projets'
import Projet from '@/pages/Projet'

Vue.use(Router)

export default new Router({
	mode:"history",
	base: window.location.href+"/",
  routes: [
    { path: '/', name: 'Config', component: Home },
    { path: '/projets', name: 'Projets', component: Projets },
    { path: '/projet/:id', name: 'projet', component: Projet }
  ]
})
