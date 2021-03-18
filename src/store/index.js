import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用于在登录成功后保存用户信息（初始只尝试读取本地存储）
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  mutations: {
    // 设置用户数据
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 将payload添加到到本地存储中
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
