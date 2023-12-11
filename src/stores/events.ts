import { defineStore } from 'pinia'
import { axiosJwt } from './axiosConfig'
import { events, stats } from '../Constants'

// Event constants
const { upcoming, ongoing, ended } = events

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
    number: 0,
    errorMsg: '',
    loaders: {
      events: false,
      addEvent: false,
      getEvents: false,
      updateEvent: false,
      getEvent: false,
      deleteEvent: false
    },
    successMsgs: {
      addEvent: '',
      updateEvent: '',
      deleteEvent: ''
    },
    event: {}
  }),
  actions: {
    async getEvents(status?: string): Promise<'success' | 'fail'> {
      this.loaders.getEvents = true
      const req = status && status.length > 0 ? `events?status=${status}` : 'events'
      try {
        const { data } = await axiosJwt.get(req)
        this.events = data.events
        this.number = data.number
        this.loaders.getEvents = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        this.loaders.getEvents = false
        return 'fail'
      }
    }
  }
})
