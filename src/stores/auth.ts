// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from './axiosConfig'
import Cookie from 'js-cookie'

type signupData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}
type loginData = {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // token: '',
    signupRes: '',
    errorMsg: '',
    userInfo: null,
    loggedIn: false,
    loaders: {
      loading: false
    }
  }),
  getters: {
    getUserInfo: (state) => state.userInfo
  },
  actions: {
    async signup(signupData: signupData): Promise<'success' | 'fail'> {
      try {
        this.loaders.loading = true
        const { data } = await axios.post('auth/signup', signupData)
        this.signupRes = data.message
        this.loaders.loading = false
        setTimeout(() => (this.signupRes = ''), 4000)
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        this.loaders.loading = false
        return 'fail'
      }
    },
    async login(loginData: loginData): Promise<'success' | 'fail'> {
      try {
        this.loaders.loading = true
        const { data } = await axios.post('auth/login', loginData)
        // this.token = data.accessToken
        this.loaders.loading = false
        this.userInfo = data.user
        this.loggedIn = true
        Cookie.set('auth-stat', 'logged-in')
        // Cookie.set('auth_session', this.token.slice(50, 80))
        Cookie.set('auth_info', JSON.stringify(this.userInfo))
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        this.loaders.loading = false
        return 'fail'
      }
    },
    async logout(): Promise<'success' | 'fail'> {
      try {
        await axios.post('auth/logout')
        Cookie.remove('auth-stat')
        Cookie.remove('auth_info')
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    }
  }
})

// async refreshSession() {
//   try {
//     const { data } = await axiosConfig().get('auth/refresh')
//     // this.token = data.accessToken
//     this.userInfo = data.user
//     this.loggedIn = true
//     return (this.token = data.accessToken)
//   } catch (error: any) {
//     this.errorMsg = error.response.data.message || error.response.message || error.message
//     return 'fail'
//   }
// }
