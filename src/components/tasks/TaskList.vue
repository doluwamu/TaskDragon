<template>
  <div v-if="taskStore.loaders.tasks" class="text-center">Loading...</div>
  <div class="flex flex-col gap-2" v-else-if="tasks.length > 0">
    <div class="tasks-list" v-for="(task, i) in tasks" :key="i">
      <RouterLink
        :to="`/tasks?details=${true}&tid=${task._id}`"
        @click="fetchTask(task._id)"
        class="flex justify-between items-center p-3 border rounded-lg hover:bg-[#fff2]"
      >
        <p class="task-name text-center">
          {{ task?.title.length > 20 ? task?.title.substring(0, 20) + '...' : task?.title }}
        </p>
        <i
          :class="`fa-solid fa-heart ${task?.favorite === true ? 'text-red-600' : 'text-white'}`"
        ></i>
      </RouterLink>
    </div>
  </div>
  <div v-else class="text-white text-center">No tasks</div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
  name: 'TaskList',
  props: ['tasks', 'fetchTask', 'taskStore', 'status'],
  components: {
    RouterLink
  }
}
</script>
