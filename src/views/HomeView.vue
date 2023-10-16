<script setup lang="ts">
import Navbar from '../components/app/Navbar.vue'
</script>

<template>
  <section>
    <Navbar />
    <div
      class="card h-full w-full mx-auto my-7 p-4 rounded-xl flex flex-col gap-5 items-center md:gap-0 md:flex-row"
    >
      <div class="text-white flex flex-col gap-4 px-2 sm:px-8 md:w-3/5">
        <h1 class="leading-tight text-3xl font-medium text-center md:text-left lg:text-5xl">
          All you need to organise your tasks in one place
        </h1>
        <p class="font-light text-center md:text-left">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis nisi, neque earum hic,
          vitae eos, sapiente quam nihil officiis nulla ducimus ratione quae quo impedit at!
          Repudiandae nostrum non odit.
        </p>
        <a
          href="/signup"
          class="button px-4 py-2 bg-white text-blue-900 text-center rounded-lg font-medium mx-auto md:mx-0"
          >Get started</a
        >
      </div>

      <div class="image-container md:w-2/5">
        <img src="../assets/imgs/taskDragon.svg" alt="task_dragon" width="350" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  max-width: 1200px;
  /* background: rgba(2, 141, 153, 0.3);
  backdrop-filter: blur(5px); */
}

.button {
  width: 120px;
}
</style>
