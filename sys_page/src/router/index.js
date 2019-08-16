import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/MainLayout'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/home',
    name: 'MainLayout',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Home',
      component: () => import('@/views/Home'),
      meta:{
        title: '首页',
        page: 'home'
      }
    }, {
      path: '/front',
      name: 'FrontEnd',
      component: () => import('@/views/FrontEnd'),
      meta:{
        title: '前端',
        page: 'front'
      }
    }, {
      path: '/back',
      name: 'BackEnd',
      component: () => import('@/views/BackEnd'),
      meta:{
        title: '后端',
        page: 'back'
      }
    }, {
      path: '/interview',
      name: 'Interview',
      component: () => import('@/views/Interview'),
      meta:{
        title: '面试',
        page: 'interview'
      }
    }, {
      path: '/draft',
      name: 'Draft',
      component: () => import('@/views/Draft'),
      meta:{
        title: '杂文',
        page: 'draft'
      }
    }, {
      path: '/article/:id',
      name: 'ArticlesDetail',
      component: () => import('@/views/ArticlesDetail'),
      meta:{
        title: '文章详情',
        page: 'article'
      }
    }, {
      path: '/user/:id',
      name: 'User',
      component: () => import('@/views/User'),
      meta:{
        title: '用户详情',
        page: 'user'
      }
    }, {
      path: '/user',
      name: 'CurrentUser',
      component: () => import('@/views/CurrentUser'),
      meta:{
        title: '用户编辑',
        page: 'loginUser'
      }
    }, {
      path: '/tool',
      name: 'ToolList',
      component: () => import('@/views/tool/list'),
      meta:{
        title: '工具列表',
        page: 'toolList'
      }
    }, {
      path: '/tool/mark/:type',
      name: 'ToolMark',
      component: () => import('@/views/tool/mark'),
      meta:{
        title: '工具-书签',
        page: 'toolMark'
      }
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }, {
    path: '/test',
    name: 'HelloWorld',
    component: () => import('@/components/HelloWorld')
  }, {
    path: '/*',
    redirect: '/home'
  }]
})

export default router
