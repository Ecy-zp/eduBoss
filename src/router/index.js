import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 引入路由中需要使用的组件功能
// import Login from '@/views/login/index'
// import Layout from '@/views/layout/index'
// import Home from '@/views/home/index'
// import Role from '@/views/role/index'
// import Menu from '@/views/menu/index'
// import Resource from '@/views/resource/index'
// import Course from '@/views/course/index'
// import User from '@/views/user/index'
// import Advert from '@/views/advert/index'
// import AdvertSpace from '@/views/advert-space/index'
// import ErrorPage from '@/views/error-page/index'

Vue.use(VueRouter)
// 路由规则(添加需要认证的requiresAuth)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    // meta添加后，其子路由都会具有同样作用
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/role/:roleId/alloc',
        name: 'alloc',
        component: () => import(/* webpackChunkName: 'role-alloc' */'@/views/role/alloc'),
        props: true
      },
      {
        path: '/role/:id/edit',
        name: 'role-edit',
        component: () => import(/* webpackChunkName: 'role-edit' */'@/views/role/Edit')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        path: '/menu/menu-create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/menucreate')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'create' */'@/views/course/create')
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'coure-edit' */'@/views/course/Edit'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'coure-section' */'@/views/course/section'),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'coure-video' */'@/views/course/video'),
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert/create',
        name: 'advert-create',
        component: () => import(/* webpackChunkName: 'advert-create' */'@/views/advert/create')
      },
      {
        path: '/advert/:advertId/edit',
        name: 'advert-edit',
        component: () => import(/* webpackChunkName: 'advert-edit' */'@/views/advert/Edit'),
        props: true
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      },
      {
        path: '/advert-space/:id/edit',
        name: 'advert-space-edit',
        component: () => import(/* webpackChunkName: 'advert-space-edit' */'@/views/advert-space/Edit'),
        props: true
      },
      {
        path: '/advert-space/create',
        name: 'advert-space-create',
        component: () => import(/* webpackChunkName: 'advert-space-create' */'@/views/advert-space/create')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 验证 to路由是否需要验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // 验证用户信息是否存在
    if (!store.state.user) {
      // 未登录,跳转到登录
      return next({
        name: 'login',
        query: {
          // 将本次路由的额fullPath传递给login页面
          redirect: to.fullPath
        }
      })
    }
    next()
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
