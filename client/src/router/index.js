import Vue from 'vue'
import VueRouter from 'vue-router'
// import register from '../views/Register.vue'
// import home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  //path: '*'： 这个路由是匹配到，找不到组件对应的路由
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    children:[
      {path:'/',component:() => import('../views/Home.vue') },
      {path:'/home',name:'home',component:() => import('../views/Home.vue')  },
      {path:'/infoshow',name:'infoshow',component:() => import('../views/InfoShow.vue') },
      {path:'/foundlist',name:'foundlist',component:() => import('../views/FoundList.vue') },
      

    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => {return import('../views/Register.vue')}
  },
  {
    path: '/login',
    name: 'login',
    component: () => {return import('../views/Login.vue')}
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫：路由进行跳转前与后时进行自定义操作。
// https://www.cnblogs.com/msjhw/p/15560426.html
// 在项目中，一般在beforeEach这个钩子函数中进行路由跳转的一些信息判断。
// 判断是否登录，是否拿到对应的路由权限等等。
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eleToken ? true : false
  if(to.path === '/login' || to.path === '/register'){
    next()
  }else{
    isLogin ? next() : next('./login')
  }
})
export default router
