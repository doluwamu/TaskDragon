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
      removeEvent: false
    },
    successMsgs: {
      addEvent: '',
      updateEvent: '',
      removeEvent: ''
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
    },
    async getEvent(eventId: string): Promise<'success' | 'fail'> {
      this.loaders.getEvent = true
      try {
        const { data } = await axiosJwt.get(`events/${eventId}`)
        this.event = data
        this.loaders.getEvent = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        this.loaders.getEvent = false
        return 'fail'
      }
    },
    async addNewEvent(eventData: {
      name: string
      description?: string
      startDate: string
      endDate: string
      reminder: boolean
    }): Promise<'success' | 'fail'> {
      this.loaders.addEvent = true
      try {
        const { data } = await axiosJwt.post('events', eventData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.successMsgs.addEvent = data.message
        this.loaders.addEvent = false
        setTimeout(() => (this.successMsgs.addEvent = ''), 5000)
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.addEvent = false
        return 'fail'
      }
    },
    async removeEvent(eventId: string): Promise<'success' | 'fail'> {
      this.loaders.removeEvent = false
      try {
        const { data } = await axiosJwt.delete(`events/${eventId}`)
        this.successMsgs.removeEvent = data.message
        setTimeout(() => (this.successMsgs.removeEvent = ''), 5000)
        this.loaders.removeEvent = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.removeEvent = false
        return 'fail'
      }
    }
  }
})
