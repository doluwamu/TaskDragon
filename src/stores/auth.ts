// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosConfig } from './axiosConfig'
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

type headers = {
  'Content-Type': string
  Authorization?: string
}

const unauthenticatedHeaders: headers = {
  'Content-Type': 'application/json'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    signupRes: '',
    errorMsg: '',
    userInfo: {},
    loggedIn: false
  }),
  getters: {
    getToken: (state) => state.token.length > 0 && state.token
  },
  actions: {
    async signup(signupData: signupData): Promise<'success' | 'fail'> {
      try {
        const { data } = await axiosConfig(unauthenticatedHeaders).post('auth/signup', signupData)
        this.signupRes = data.message
        setTimeout(() => (this.signupRes = ''), 2000)
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    },
    async login(loginData: loginData): Promise<'success' | 'fail'> {
      try {
        const { data } = await axiosConfig(unauthenticatedHeaders).post('auth/login', loginData)
        this.token = data.accessToken
        this.userInfo = data.user
        this.loggedIn = true
        Cookie.set('auth-stat', 'logged-in', { expires: 7 })
        Cookie.set('auth_session', this.token.slice(1, 10))
        Cookie.set('auth_info', JSON.stringify(this.userInfo))
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    },
    async refreshSession() {
      try {
        await axiosConfig()
          .get('auth/refresh')
          .then(({ data }) => {
            // this.token = data.accessToken
            this.userInfo = data.user
            this.loggedIn = true
            return (this.token = data.accessToken)
          })
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    }
  }
})
