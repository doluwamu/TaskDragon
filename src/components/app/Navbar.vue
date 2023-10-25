<template>
  <nav id="navbar" class="nav-bar sticky top-0 z-50 overflow-hidden bg-[#000216] md:bg-inherit">
    <div
      class="flex flex-col justify-between items-center text-center py-6 px-4 mx-auto gap-6 md:gap-0 md:flex-row"
      style="max-width: 1200px"
    >
      <div class="flex flex-row justify-between items-center w-full px-4 md:w-28">
        <a href="/" class="flex flex-col justify-center">
          <img src="@/assets/imgs/td_logo.png" alt="img" width="30" class="mx-auto" />
          <span class="text-center text-white font-semibold text-sm">TaskDragon</span>
        </a>

        <div
          class="flex flex-col items-start justify-center hamburger space-y-2 overflow-hidden cursor-pointer md:hidden"
          id="ham"
          @click="openNav"
          style="width: 25px; height: 20px"
        >
          <div id="top" class="ham-line w-full bg-white rounded-3xl" style="height: 1px"></div>
          <div id="center" class="ham-line w-full bg-white rounded-3xl" style="height: 1px"></div>
          <div id="bottom" class="ham-line w-full bg-white rounded-3xl" style="height: 1px"></div>
        </div>
      </div>

      <div class="nav-links flex flex-col gap-10 items-center md:flex-row">
        <div class="flex flex-col text-white text-sm" v-if="userInfo?._id">
          <p>Welcome:</p>
          <p>{{ userInfo?.username }}</p>
        </div>

        <div class="flex flex-col justify-center gap-10 text-white md:flex-row">
          <a href="/">Home</a>
          <a href="/tasks" v-if="userInfo?._id">Tasks</a>
        </div>

        <div v-if="!userInfo?._id" class="flex flex-col gap-8 md:gap-5 md:flex-row">
          <a href="/signup" class="button bg-white px-4 py-2 rounded-lg font-medium">Get started</a>

          <a
            href="/login"
            class="button border border-white text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600"
            style="transition: 0.5s"
          >
            Login
          </a>
        </div>

        <div v-if="userInfo?._id" class="flex flex-col gap-8 md:gap-5 md:flex-row">
          <button
            class="button border border-white text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600"
            style="transition: 0.5s"
            @click="logoutUser"
          >
            Logout
          </button>
        </div>

        <!-- <div class="flex flex-col gap-1 justify-center items-center">
            <img :src="user.picture" :alt="user.nickname" width="35" class="rounded-full" />
            <div class="text-white text-xs">{{ user.nickname }}</div>
          </div> -->
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Cookies from 'js-cookie'
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'NavBar',
  setup() {
    const userInfo = Cookies.get('auth_info') && JSON.parse(Cookies.get('auth_info'))

    if (userInfo) {
      return { userInfo }
    }
  },
  mounted() {
    const navbar = document.getElementById('navbar')

    navbar.classList.add('h-24')
  },
  methods: {
    openNav() {
      // hamburger bars
      const top: HTMLElement = document.getElementById('top')
      const center: HTMLElement = document.getElementById('center')
      const bottom: HTMLElement = document.getElementById('bottom')

      //   center.classList.toggle('hidden')
      top.classList.toggle('rotate-45')
      bottom.classList.toggle('rotate-neg45')

      center.classList.toggle('center-ham-move')

      const navbar = document.getElementById('navbar')
      navbar.classList.toggle('h-24')
    },
    async logoutUser() {
      const authStore = useAuthStore()
      const { logout } = authStore

      const res: string = await logout()

      if (res === 'success') {
        return window.location.replace('/')
      }
    }
  }
}
</script>

<style>
.rotate-neg45 {
  transform: rotate(-45deg);
}

.ham-line {
  transition: 0.5s;
}

.center-ham-move {
  transform: translateX(-80px);
}
</style>
