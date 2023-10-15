import { ref, computed } from 'vue'
import { defineStore, Store } from 'pinia'
import axios from 'axios'

type CakesDummy = {
  readonly id: string | number
  readonly type: string
  readonly image?: string
}

const cakesDummy: CakesDummy[] = [
  {
    id: 'KXA4ZPADX9',
    type: 'Vanilla',
    image: 'cakeImg'
  },
  {
    id: 'X70RSEEWL3',
    type: 'Strawberry',
    image: 'cakeImg'
  },
  {
    id: 'RFME4EM9BQ',
    type: 'Banana',
    image: 'cakeImg'
  }
]

const topFlavours: CakesDummy[] = [
  {
    id: '0TUFQLUJ2F',
    type: 'Cup cakes',
    image: 'cupcakes'
  },
  {
    id: 'C0QZTHGLHP',
    type: 'Muffins',
    image: 'muffins'
  },
  {
    id: 'HB37G5HC09',
    type: 'Tripple mix',
    image: 'tripplemix'
  }
]

type State = {
  cakes: unknown[]
  loadingFetch: boolean
  flavours: unknown[]
}

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

export const useCakeStore = defineStore('cake', {
  state: () => ({
    cakes: cakesDummy,
    loadingFetch: false,
    flavours: topFlavours
  }),
  actions: {
    async getCakes(num: number = 6) {
      try {
        this.loadingFetch = true
        const { data } = await axios.get(`http://localhost:3000/api/v1/cakes?number=${num}`)
        this.loadingFetch = false
        return (this.cakes = data)
      } catch (error) {
        // debugger
        this.loadingFetch = false
        throw error
      }
    }
  }
})
