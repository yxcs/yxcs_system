import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainLayout from '@/components/MainLayout'
import NewHome from '@/views/NewHome'
import Article from '@/views/Article'
import BackPage from '@/views/BackPage'
import DraftPage from '@/views/DraftPage'
import FrontPage from '@/views/FrontPage'
import InterviewPage from '@/views/InterviewPage'

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
        requireAuth: true,
      },
    }, {
      path: '/article/:id',
      name: 'Article',
      component: Article,
      meta: {
        requireAuth: true,
      },
    }, {
      path: '/back',
      name: 'BackPage',
      component: BackPage,
      meta: {
        requireAuth: true,
      },
    }, {
      path: '/draft',
      name: 'DraftPage',
      component: DraftPage,
      meta: {
        requireAuth: true,
      },
    }, {
      path: '/front',
      name: 'FrontPage',
      component: FrontPage,
      meta: {
        requireAuth: true,
      },
    }, {
      path: '/interview',
      name: 'InterviewPage',
      component: InterviewPage,
      meta: {
        requireAuth: true,
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
