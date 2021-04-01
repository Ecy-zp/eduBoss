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
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index'),
        meta: [
          { title: '权限管理' },
          { title: '角色列表', url: '/role' }
        ]
      },
      {
        path: '/role/:roleId/alloc',
        name: 'alloc',
        component: () => import(/* webpackChunkName: 'role-alloc' */'@/views/role/alloc'),
        props: true,
        meta: [
          { title: '权限管理' },
          { title: '角色列表', url: '/role' },
          { title: '分配菜单' }
        ]
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'role-alloc-resource' */'@/views/role/allocResource'),
        props: true,
        meta: [
          { title: '权限管理' },
          { title: '角色列表', url: '/role' },
          { title: '分配资源' }
        ]
      },
      {
        path: '/role/:id/edit',
        name: 'role-edit',
        component: () => import(/* webpackChunkName: 'role-edit' */'@/views/role/Edit'),
        meta: [
          { title: '权限管理' },
          { title: '角色列表', url: '/role' },
          { title: '编辑角色' }
        ]
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index'),
        meta: [
          { title: '权限管理' },
          { title: '菜单列表' }
        ]
      },
      {
        path: '/menu/menu-create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/menucreate'),
        meta: [
          { title: '权限管理' },
          { title: '菜单管理', url: '/menu' },
          { title: '添加菜单' }
        ]
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit'),
        meta: [
          { title: '权限管理' },
          { title: '菜单管理', url: '/menu' },
          { title: '编辑菜单' }
        ]
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index'),
        meta: [
          { title: '权限管理' },
          { title: '资源管理' }
        ]
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index'),
        meta: [
          { title: '课程管理' }
        ]
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'create' */'@/views/course/create'),
        meta: [
          { title: '课程管理', url: '/course' },
          { title: '新建课程' }
        ]
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'coure-edit' */'@/views/course/Edit'),
        meta: [
          { title: '课程管理', url: '/course' },
          { title: '编辑课程' }
        ],
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'coure-section' */'@/views/course/section'),
        meta: [
          { title: '课程管理', url: '/course' },
          { title: '内容管理' }
        ],
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'coure-video' */'@/views/course/video'),
        meta: [
          { title: '课程管理', url: '/course' },
          { title: '上传图片' }
        ],
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
        meta: [
          { title: '用户管理' }
        ]
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index'),
        meta: [
          { title: '广告管理' },
          { title: '广告列表' }
        ]
      },
      {
        path: '/advert/create',
        name: 'advert-create',
        component: () => import(/* webpackChunkName: 'advert-create' */'@/views/advert/create'),
        meta: [
          { title: '广告管理' },
          { title: '广告列表', url: '/advert' },
          { title: '新建广告' }
        ]
      },
      {
        path: '/advert/:advertId/edit',
        name: 'advert-edit',
        component: () => import(/* webpackChunkName: 'advert-edit' */'@/views/advert/Edit'),
        meta: [
          { title: '广告管理' },
          { title: '广告列表', url: '/advert' },
          { title: '编辑广告' }
        ],
        props: true
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index'),
        meta: [
          { title: '广告管理' },
          { title: '广告位列表' }
        ]
      },
      {
        path: '/advert-space/:id/edit',
        name: 'advert-space-edit',
        component: () => import(/* webpackChunkName: 'advert-space-edit' */'@/views/advert-space/Edit'),
        meta: [
          { title: '广告管理' },
          { title: '广告位列表', url: '/advert-space' },
          { title: '编辑广告位' }
        ],
        props: true
      },
      {
        path: '/advert-space/create',
        name: 'advert-space-create',
        component: () => import(/* webpackChunkName: 'advert-space-create' */'@/views/advert-space/create'),
        meta: [
          { title: '广告管理' },
          { title: '广告位列表', url: '/advert-space' },
          { title: '新建广告位' }
        ]
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
