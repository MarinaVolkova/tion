import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '../filters/data.filter'

export const eventBus = new Vue()

import './assets/styles/style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'




Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.filter('date', dateFilter)


firebase.initializeApp({
  apiKey: "AIzaSyDrcD6AXLzw9DY5CfxBLVrSORuVEqiRAQU",
  authDomain: "tionssuwt.firebaseapp.com",
  projectId: "tionssuwt",
  storageBucket: "tionssuwt.appspot.com",
  messagingSenderId: "790834574937",
  appId: "1:790834574937:web:6da9318e9e9fb123806348",
  measurementId: "G-2B01307W4C"
})

let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
  app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
}
})


