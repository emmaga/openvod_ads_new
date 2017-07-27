import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Main from '@/view/main/main'
import AdsBoard from '@/view/main/adsBoard/adsBoard'
import AdsMaterial from '@/view/main/adsMaterial/adsMaterial'
import MenuAdv from '@/view/main/menuAdv/menuAdv'
import menuAdsMaterial from '@/view/main/menuAdsMaterial/menuAdsMaterial'
import userManage from '@/view/main/userManage/userList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      redirect: '/'
    },
    {
      path: '/main',
      redirect: '/main/adsBoard',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'adsBoard',
          component: AdsBoard
        },
        {
          path: 'adsMaterial',
          component: AdsMaterial
        },
        {
          path: 'menuAdv',
          component: MenuAdv
        },
        {
          path: 'menuAdsMaterial',
          component: menuAdsMaterial
        },
        {
          path: 'userManage',
          component: userManage
        }
      ]
    }
  ]
})
