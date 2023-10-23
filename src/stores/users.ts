// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axiosJwt } from './axiosConfig'
import Cookie from 'js-cookie'

type secrets = {
  color: string | any
  DOB: string | any
  food: string | any
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    errorMsg: '',
    sucessMsg: '',
    userInfo: {}
  }),
  actions: {
    async setUserSecrets(secrets: secrets, userId: string): Promise<'success' | 'fail'> {
      try {
        const { data } = await axiosJwt.post(`users/secret/${userId}`, secrets, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        this.sucessMsg = data.message
        this.userInfo = data.user
        Cookie.set('auth_info', JSON.stringify(this.userInfo), { expires: 7 })

        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    },
    async verifyUserAccount(userId: string): Promise<'success' | 'fail'> {
      try {
        const { data } = await axiosJwt.post(`users/verify/${userId}`)

        this.sucessMsg = data.message
        this.userInfo = data.user
        Cookie.set('auth_info', JSON.stringify(this.userInfo), { expires: 7 })

        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    }
  }
})
