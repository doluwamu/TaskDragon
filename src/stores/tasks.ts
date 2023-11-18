import { defineStore } from 'pinia'
import { axiosJwt } from './axiosConfig'
import timeOutSetter from '@/helper/timeOutSetter'

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

export type fav = {
  favorite?: boolean
}

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
    loaders: {
      tasks: false,
      addTask: false,
      getTask: false,
      updateTask: false,
      updateStatus: false,
      deleteTask: false
    },
    successMsgs: {
      addTask: '',
      updateTask: '',
      updateStatus: '',
      deleteTask: ''
    },
    task: {}
  }),
  actions: {
    async getUndoneTasks(number: number): Promise<'success' | 'fail'> {
      try {
        this.loaders.tasks = true
        const { data } = await axiosJwt.get(
          `tasks/mine?status=undone${typeof number === 'number' && `&number=${number}`}`
        )
        this.loaders.tasks = false
        this.tasks.undone = data.tasks
        this.number.undone = data.number
        return 'success'
      } catch (error: any) {
        // debugger
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.tasks = false
        return 'fail'
      }
    },
    async getDoingTasks(number: number): Promise<'success' | 'fail'> {
      try {
        this.loaders.tasks = true
        const { data } = await axiosJwt.get(
          `tasks/mine?status=doing${typeof number === 'number' && `&number=${number}`}`
        )
        this.loaders.tasks = false
        this.tasks.doing = data.tasks
        this.number.doing = data.number
        return 'success'
      } catch (error: any) {
        // debugger
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.tasks = false
        return 'fail'
      }
    },
    async getDoneTasks(number: number): Promise<'success' | 'fail'> {
      try {
        this.loaders.tasks = true
        const { data } = await axiosJwt.get(
          `tasks/mine?status=done${typeof number === 'number' && `&number=${number}`}`
        )
        this.loaders.tasks = false
        this.tasks.done = data.tasks
        this.number.done = data.number
        return 'success'
      } catch (error: any) {
        // debugger
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.tasks = false
        return 'fail'
      }
    },
    async addTask(taskDetails: {
      title: string
      description: string
      priority: string
    }): Promise<'success' | 'fail'> {
      try {
        this.loaders.addTask = true
        const { data } = await axiosJwt.post('tasks/new', taskDetails, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.loaders.addTask = false
        this.successMsgs.addTask = data.message

        setTimeout(() => (this.successMsgs.addTask = ''), 5000)
        console.log(this.successMsgs.addTask)

        return 'success'
      } catch (error: any) {
        this.errorMsg = error?.response?.data?.message || error?.response?.message || error?.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.addTask = false
        return 'fail'
      }
    },
    async getTask(id: string): Promise<'success' | 'fail'> {
      try {
        this.task = {}
        this.loaders.getTask = true
        const { data } = await axiosJwt.get(`tasks/${id}`)
        this.task = data
        this.loaders.getTask = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error?.response?.data?.message || error?.response?.message || error?.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.getTask = false
        return 'fail'
      }
    },
    async updateTask(
      taskId: string,
      taskDetails: { title?: string; description?: string; favorite?: boolean; priority?: string }
    ): Promise<'success' | 'fail'> {
      try {
        this.loaders.updateTask = true
        this.task = {}
        const { data } = await axiosJwt.put(`tasks/${taskId}`, taskDetails, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.loaders.updateTask = false
        this.task = data.task
        this.successMsgs.updateTask = data.message
        setTimeout(() => (this.successMsgs.updateTask = ''), 5000)
        return 'success'
      } catch (error: any) {
        this.errorMsg = error?.response?.data?.message || error?.response?.message || error?.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.updateTask = false
        return 'fail'
      }
    },
    async updateTaskStatus(taskId: string, status: string): Promise<'success' | 'fail'> {
      try {
        this.loaders.updateStatus = true

        // console.log(status)
        const { data } = await axiosJwt.put(
          `tasks/${taskId}/status`,
          { status },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        // debugger
        this.loaders.updateStatus = false
        this.successMsgs.updateStatus = data.message
        setTimeout(() => (this.successMsgs.updateStatus = ''), 5000)
        this.task = data.task
        return 'success'
      } catch (error: any) {
        this.errorMsg = error?.response?.data?.message || error?.response?.message || error?.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.updateStatus = false
        return 'fail'
      }
    },
    async updateTaskLike(taskId: string, favorite: boolean) {
      try {
        this.loaders.updateTask = true
        this.task = {}
        const { data } = await axiosJwt.put(
          `tasks/${taskId}/favorite`,
          { favorite },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        this.loaders.updateTask = false
        this.task = data.task
        // this.successMsgs.updateTask = data.message
        return 'success'
      } catch (error: any) {
        this.errorMsg = error?.response?.data?.message || error?.response?.message || error?.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.updateTask = false
        return 'fail'
      }
    },
    async deleteTask(taskId: string): Promise<'success' | 'fail'> {
      try {
        this.loaders.deleteTask = true
        const { data } = await axiosJwt.delete(`tasks/${taskId}`)
        this.successMsgs.deleteTask = data.message
        setTimeout(() => (this.successMsgs.deleteTask = ''), 5000)
        this.loaders.deleteTask = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error?.response?.data?.message || error?.response?.message || error?.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.deleteTask = false
        return 'fail'
      }
    }
  }
})
