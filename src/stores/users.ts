// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosConfig } from './axiosConfig'
import Cookie from 'js-cookie'
// import { useAuthStore } from './auth'

// const authStore = useAuthStore()

// const { token } = authStore

type secrets = {
  color: string
  DOB: string
  food: string
}

type headers = {
  'Content-Type': string
  Authorization?: string
}

// const authenticatedHeaders: headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${token}`
// }

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    errorMsg: '',
    sucessMsg: ''
  }),
  actions: {
    async setUserSecrets(
      secrets: secrets,
      userId: string,
      token: string
    ): Promise<'success' | 'fail'> {
      try {
        const { data } = await axiosConfig({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }).post(`users/secret/${userId}`, secrets)

        this.sucessMsg = data.message

        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    }
  }
})
