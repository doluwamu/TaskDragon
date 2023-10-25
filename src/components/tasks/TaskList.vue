<template>
  <div class="flex flex-col gap-2" v-if="tasks.length > 0">
    <div class="tasks-list" v-for="(task, i) in tasks" :key="i">
      <div class="flex justify-between items-center p-3 border rounded-lg hover:bg-[#fff2]">
        <p class="task-name text-center">{{ task?.title }}</p>
        <i
          :class="`fa-solid fa-heart ${task?.favorite === true ? 'text-red-600' : 'text-white'}`"
        ></i>
      </div>
    </div>
  </div>
  <div v-else class="text-white text-center">No tasks</div>
</template>

<script lang="ts">
export default {
  name: 'TaskList',
  props: ['tasks']
}
</script>
