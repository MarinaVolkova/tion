import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout:'empty'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/About',
    name: 'About',
    meta: {layout:'main'},
    component: () => import('../views/About.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {layout:'empty'},
    component: () => import('../views/Login.vue')
  },
  ,
  {
    path: '/Registr',
    name: 'Registr',
    meta: {layout:'empty'},
    component: () => import('../views/Registr.vue')
  },
  {
    path: '/Table',
    name: 'Table',
    meta: {layout:'main'},
    component: () => import('../views/Table.vue')
  },
  ,
  {
    path: '/Tablered',
    name: 'Tablered',
    meta: {layout:'main'},
    component: () => import('../views/Tablered.vue')
  },
  {
    path: '/Reggroup',
    name: 'Reggroup',
    meta: {layout:'main'},
    component: () => import('../views/Reggroup.vue')
  },
  {
    path: '/Tablebottom',
    name: 'Tablebottom',
    component: () => import('../views/Tablebottom.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
