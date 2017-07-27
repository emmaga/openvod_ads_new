/**
 * Created by 陈振华 on 2017/6/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {setUserInfo, getUserInfo} from '@/static/js/Common'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: '',
    role: ''
  },
  mutations: {
    setUserName: function (state, name) {
      setUserInfo('username', name)
      state.username = name
    },
    getUserName: function (state) {
      state.username = getUserInfo('username')
    },
    setUserRole: function (state, role) {
      setUserInfo('role', role)
      state.role = role
    },
    getUserRole: function (state) {
      state.role = getUserInfo('role')
    }
  }
})

export default store
