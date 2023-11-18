<template>
  <button
    @click="toggleToast"
    :class="`${
      isOpen && info ? 'block' : 'hidden'
    } fixed top-20 right-10 pt-2 m-1 space-y-3 max-w-[300px] z-50 bg-white rounded-md overflow-hidden`"
  >
    <p :class="`${type === 'error' ? 'text-red-700' : 'text-green-700'} text-left  px-2`">
      {{ message }}
    </p>

    <div :class="`progress w-full h-1 ${type === 'error' ? 'bg-red-700' : 'bg-green-700'}`"></div>
  </button>
</template>

<script lang="ts">
export default {
  name: 'ToastNotification',
  props: {
    message: String,
    messageType: String
    // openToast: Boolean
  },
  data() {
    return {
      isOpen: this.message && this.message.length > 0 && true,
      info: this.message || '',
      type: this.messageType || 'success'
      // types: {
      //   success: 'success'
      // }
    }
  },
  methods: {
    toggleToast() {
      this.isOpen = false
      this.info = ''
    }
  }
}
</script>

<style scoped>
.progress {
  animation: moveProgress 5s linear;
  animation-fill-mode: forwards;
}

@keyframes moveProgress {
  to {
    transform: translateX(-100%);
  }
}
</style>
