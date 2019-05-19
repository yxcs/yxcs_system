import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainLayout from '@/components/MainLayout'
import NewHome from '@/views/NewHome'
import Article from '@/views/Article'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/home',
    name: 'MainLayout',
    component: MainLayout,
    children: [{
      path: '',
      name: 'NewHome',
      component: NewHome,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    }, {
      path: '/article/:id',
      name: 'Article',
      component: Article,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    }]
  }, {
    path: '/test',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/*',
    redirect: '/home'
  }]
})

const store = {
  token: true
}
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})

export default router
