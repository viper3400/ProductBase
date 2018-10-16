import Vue from 'vue'
import Router from 'vue-router'
import CreateEntry from '@/components/CreateEntry'
import EntryList from '@/components/EntryList'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/createentry',
      name: 'CreateEntry',
      component: CreateEntry,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/entrylist',
      name: 'EntryList',
      component: EntryList,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/')
  else if (!requiresAuth && currentUser) next('entryList')
  else next()
})

export default router
