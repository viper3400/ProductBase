import Vue from 'vue'
import Router from 'vue-router'
import EntryList from '@/components/EntryList'
import EditProduct from '@/components/EditProduct'
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
      path: '/entrylist',
      name: 'EntryList',
      component: EntryList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editproduct/:id',
      name: 'EditProduct',
      component: EditProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createproduct',
      name: 'EditProduct',
      component: EditProduct,
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
