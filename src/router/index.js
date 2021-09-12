import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Course.vue'),
    meta: {
      login: false,
      needUserCreation: true
    },
    // beforeEnter: (to, from, next) => {
    //   const user = store.getters['user/getMeInfo']

    //   if (!user)
    //     store.dispatch('user/FETCH', next)
    //   else
    //     next()
    // }
  },
  {
    path: '/tempkey/:id',
    name: 'TempToken',
    component: () => import('../views/TempToken.vue'),
    meta: {
      login: true,
      needUserCreation: false
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Simulator.vue'),
    meta: {
      login: false,
      needUserCreation: true
    }
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('../views/Onboarding.vue'),
    meta: {
      login: false,
      needUserCreation: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      login: true,
      needUserCreation: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Login.vue'), 
    meta: {
      login: true,
      needUserCreation: false
    }
  },
  {
    path: '/reset_password',
    name: 'Recover',
    component: () => import('../views/Login.vue'), 
    meta: {
      login: true,
      needUserCreation: false
    }
  },
  {
    path: '/make_user',
    name: 'MakeUser',
    component: () => import('../views/MakeUser.vue'),
    meta: {
      login: false,
      needUserCreation: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      login: false,
      needUserCreation: true
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      login: false,
      needUserCreation: true
    }
  },
  {
    path: '/theory',
    name: 'Theory',
    component: () => import('../views/Theory.vue'),
    meta: {
      login: false,
      needUserCreation: true
    }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Notifications.vue'),
    meta: {
      login: false,
      needUserCreation: true
    }
  },
  {
    path: '/certificate',
    name: 'Certificate',
    component: () => import('../views/Certificate.vue'),
    meta: {
      login: false,
      needUserCreation: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const isLogin = store.getters['user/getIsLogin']

  if (isLogin && to.meta.login)
    next({ name: 'Home' })
  else if (!isLogin && !to.meta.login)
    next({ name: 'Login' })
  else
    next()
})




export default router
