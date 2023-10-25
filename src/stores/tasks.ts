import { defineStore } from 'pinia'
import { axiosJwt } from './axiosConfig'

// const state = (): State => ({
//   cakes: cakesDummy,
//   loadingFetch: false,
//   flavours: topFlavours
// })

// const actions = {
//   async getCakes() {
//     // state().cakes
//   }
// }

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: {
      undone: [],
      doing: [],
      done: []
    },
    number: {
      undone: 0,
      doing: 0,
      done: 0
    },
    errorMsg: '',
    loadingFetch: false
  }),
  actions: {
    async getUndoneTasks(): Promise<'success' | 'fail'> {
      try {
        this.loadingFetch = true
        const { data } = await axiosJwt.get('tasks/mine?status=undone')
        this.loadingFetch = false
        this.tasks.undone = data.tasks
        this.number.undone = data.number
        return 'success'
      } catch (error: any) {
        // debugger
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    },
    async getDoingTasks(): Promise<'success' | 'fail'> {
      try {
        this.loadingFetch = true
        const { data } = await axiosJwt.get('tasks/mine?status=doing')
        this.loadingFetch = false
        this.tasks.doing = data.tasks
        this.number.doing = data.number
        return 'success'
      } catch (error: any) {
        // debugger
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    },
    async getDoneTasks(): Promise<'success' | 'fail'> {
      try {
        this.loadingFetch = true
        const { data } = await axiosJwt.get('tasks/mine?status=done')
        this.loadingFetch = false
        this.tasks.done = data.tasks
        this.number.done = data.number
        return 'success'
      } catch (error: any) {
        // debugger
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    }
  }
})
