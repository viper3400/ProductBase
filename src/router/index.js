import Vue from 'vue'
import Router from 'vue-router'
import CreateEntry from '@/components/CreateEntry'
import EntryList from '@/components/EntryList'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/createentry',
      name: 'CreateEntry',
      component: CreateEntry
    },
    {
      path: '/entrylist',
      name: 'EntryList',
      component: EntryList
    }
  ]
})
