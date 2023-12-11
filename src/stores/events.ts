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
    async getEvents(params: { status?: string; search?: string }): Promise<'success' | 'fail'> {
      this.loaders.getEvents = true
      const req =
        params.status && params.search && params.status.length > 0 && params.search.length > 0
          ? `events?status=${params.status}&search=${params.search}`
          : params.status && params.status.length > 0
          ? `events?status=${params.status}`
          : params.search && params.search.length > 0
          ? `events?search=${params.search}`
          : 'events'
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
