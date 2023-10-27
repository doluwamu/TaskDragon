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
    loadingFetch: false,
    successMsg: ''
  }),
  actions: {
    async getUndoneTasks(number: number): Promise<'success' | 'fail'> {
      try {
        this.loadingFetch = true
        const { data } = await axiosJwt.get(
          `tasks/mine?status=undone${typeof number === 'number' && `&number=${number}`}`
        )
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
    async getDoingTasks(number: number): Promise<'success' | 'fail'> {
      try {
        this.loadingFetch = true
        const { data } = await axiosJwt.get(
          `tasks/mine?status=doing${typeof number === 'number' && `&number=${number}`}`
        )
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
    async getDoneTasks(number: number): Promise<'success' | 'fail'> {
      try {
        this.loadingFetch = true
        const { data } = await axiosJwt.get(
          `tasks/mine?status=done${typeof number === 'number' && `&number=${number}`}`
        )
        this.loadingFetch = false
        this.tasks.done = data.tasks
        this.number.done = data.number
        return 'success'
      } catch (error: any) {
        // debugger
        this.errorMsg = error.response.data.message || error.response.message || error.message
        return 'fail'
      }
    },
    async addTask(taskDetails: {
      title: string
      description: string
      priority: string
    }): Promise<'success' | 'fail'> {
      try {
        this.loadingFetch = true
        const { data } = await axiosJwt.post('tasks/new', taskDetails, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.loadingFetch = false
        this.successMsg = data.message
        return 'success'
      } catch (error: any) {
        this.errorMsg = error?.response?.data?.message || error?.response?.message || error?.message
        return 'fail'
      }
    }
  }
})
