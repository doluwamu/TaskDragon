// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosConfig } from './axiosConfig'
// import axios from 'axios'

export type signupData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    signupRes: '',
    errorMsg: ''
  }),
  actions: {
    async signup(signupData: signupData): Promise<'success' | 'fail'> {
      try {
        const { data } = await axiosConfig().post('auth/signup', signupData)
        this.signupRes = data.message
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message
        return 'fail'
      }
    }
  }
})
