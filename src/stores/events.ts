import { defineStore } from 'pinia'
import { axiosJwt } from './axiosConfig'
import { events, stats } from '../Constants'

// Event constants
const { upcoming, ongoing, ended } = events

type eventInfo = {
  name: string
  description?: string
  startDate: Date
  endDate: Date
  reminder: boolean
}

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
    number: 0,
    errorMsg: '',
    loaders: {
      addEvent: false,
      getEvents: false,
      updateEvent: false,
      getEvent: false,
      removeEvent: false,
      clearEvents: false,
      reminder: false
    },
    successMsgs: {
      addEvent: '',
      updateEvent: '',
      removeEvent: '',
      setReminder: '',
      stopReminder: '',
      clearEvents: ''
    },
    event: {}
  }),
  actions: {
    async getEvents(params: {
      status?: string
      search?: string
      number?: number
    }): Promise<'success' | 'fail'> {
      this.loaders.getEvents = true
      // const req =
      //   params.status && params.search && params.status.length > 0 && params.search.length > 0
      //     ? `events?status=${params.status}&search=${params.search}`
      //     : params.status && params.search && params.num && params.status.length > 0 && params.search.length > 0
      //     ? ``
      //     : params.status && params.status.length > 0
      //     ? `events?status=${params.status}`
      //     : params.search && params.search.length > 0
      //     ? `events?search=${params.search}`
      //     : 'events'

      const req = `events?status=${params.status || ''}&search=${params.search || ''}&number=${
        params.number || 20
      }`

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
    async addNewEvent(eventData: eventInfo): Promise<'success' | 'fail'> {
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
      this.loaders.removeEvent = true
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
    },
    async setReminder(eventId: string): Promise<'success' | 'fail'> {
      this.loaders.reminder = true
      try {
        const { data } = await axiosJwt.put(`events/${eventId}/reminder`)
        this.successMsgs.setReminder = data.message
        setTimeout(() => (this.successMsgs.setReminder = ''), 5000)
        this.loaders.reminder = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.reminder = false
        return 'fail'
      }
    },
    async stopReminder(eventId: string): Promise<'success' | 'fail'> {
      this.loaders.reminder = true
      try {
        const { data } = await axiosJwt.put(`events/${eventId}/reminder/stop`)
        this.successMsgs.stopReminder = data.message
        setTimeout(() => (this.successMsgs.stopReminder = ''), 5000)
        this.loaders.reminder = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.reminder = false
        return 'fail'
      }
    },
    async updateEventDetails(eventId: string, eventData: eventInfo): Promise<'success' | 'fail'> {
      this.loaders.updateEvent = true
      try {
        const { data } = await axiosJwt.put(`events/${eventId}`, eventData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.event = data.event
        this.successMsgs.updateEvent = data.message
        setTimeout(() => (this.successMsgs.updateEvent = ''), 5000)
        this.loaders.updateEvent = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.updateEvent = false
        return 'fail'
      }
    },
    async clearEvents(): Promise<'success' | 'fail'> {
      this.loaders.clearEvents = true
      try {
        const { data } = await axiosJwt.delete('events')
        this.successMsgs.clearEvents = data.message
        setTimeout(() => (this.successMsgs.clearEvents = ''), 5000)
        this.loaders.clearEvents = false
        return 'success'
      } catch (error: any) {
        this.errorMsg = error.response.data.message || error.response.message || error.message
        setTimeout(() => (this.errorMsg = ''), 5000)
        this.loaders.clearEvents = false
        return 'fail'
      }
    }
  }
})
