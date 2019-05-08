import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainLayout from '@/components/MainLayout'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        }
      ]
    }, {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/*',
      redirect: '/home'
    }
  ]
})
