import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainLayout from "@/views/MainLayout";
const Home = () => import('@/views/Home')
const FrontEnd = () => import('@/views/FrontEnd')
const BackEnd = () => import('@/views/BackEnd')
const Interview = () => import('@/views/Interview')
const Draft = () => import('@/views/Draft')
const ArticlesDetail = () => import('@/views/ArticlesDetail')
const User = () => import('@/views/User')

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/home',
    name: 'MainLayout',
    component: MainLayout,
    children: [{
      path: '',
      name: 'Home',
      component: Home,
      meta:{
        title: '首页',
        page: 'home'
      }
    }, {
      path: '/front',
      name: 'FrontEnd',
      component: FrontEnd,
      meta:{
        title: '前端',
        page: 'front'
      }
    }, {
      path: '/back',
      name: 'BackEnd',
      component: BackEnd,
      meta:{
        title: '后端',
        page: 'back'
      }
    }, {
      path: '/interview',
      name: 'Interview',
      component: Interview,
      meta:{
        title: '面试',
        page: 'interview'
      }
    }, {
      path: '/draft',
      name: 'Draft',
      component: Draft,
      meta:{
        title: '杂文',
        page: 'draft'
      }
    }, {
      path: '/article/:id',
      name: 'ArticlesDetail',
      component: ArticlesDetail,
      meta:{
        title: '文章详情',
        page: 'article'
      }
    }, {
      path: '/user/:id',
      name: 'User',
      component: User,
      meta:{
        title: '用户详情',
        page: 'user'
      }
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

export default router
