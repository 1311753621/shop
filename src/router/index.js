import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: ()=> {  // 路由懒加载
      return import('../views/Home.vue')
    },
   
    children:[
      {
        path:'/all',
        name:'All',
        component: ()=> {  // 路由懒加载
          return import('../components/All.vue')
        },
      },
      {
        path:'/cart',
        name:'Cart',
        component: ()=> {  // 路由懒加载
          return import('../components/Cart.vue')
        },
        beforeEnter(to,from,next){
          if(sessionStorage.getItem("token")){
            next()
          }else{
            alert("请登录！")
            next("/home")
          }
        },
      },
      {
        path:'/allshop',
        name:'Allshop',
        component: ()=> {  // 路由懒加载
          return import('../components/Allshop.vue')
        },
        children:[
          {
            path:'/sgall',
            name:'Sgall',
            component: ()=> {  // 路由懒加载
              return import('../components/Sgall.vue')
            },
          },
          {
            path:'/sgphone',
            name:'Sgphone',
            component: ()=> {  // 路由懒加载
              return import('../components/Sgphone.vue')
            },
          },
          {
            path:'/sgtv',
            name:'Sgtv',
            component: ()=> {  // 路由懒加载
              return import('../components/Sgtv.vue')
            },
          },
          {
            path:'/sgtiao',
            name:'Sgtiao',
            component: ()=> {  // 路由懒加载
              return import('../components/Sgtiao.vue')
            },
          }
        ]
      },
      {
        path:'/allwe',
        name:'Allwe',
        component: ()=> {  // 路由懒加载
          return import('../components/Allwe.vue')
        },
      }
    ]
  },
 
  {
    path:'/',
    redirect:'/all'
  }
]

const router = new VueRouter({
  routes
})

export default router
