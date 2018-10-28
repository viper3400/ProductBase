// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// import firebasconf from './firebaseconf.js'
import VueFire from 'vuefire'
// import db from './firebase'
import './ml'
import VueViewports from 'vue-viewports'

let app

Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(VueFire)

const options = [
  {
    rule: '320px',
    label: 'mobile'
  },
  {
    rule: '768px',
    label: 'tablet'
  },
  {
    rule: '1024px',
    label: 'desktop'
  },
  {
    rule: '1920px',
    label: 'hd-desktop'
  },
  {
    rule: '2560px',
    label: 'qhd-desktop'
  },
  {
    rule: '3840px',
    label: 'uhd-desktop'
  }
]

Vue.use(VueViewports, options)

// firebase.initializeApp(firebasconf)

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})
