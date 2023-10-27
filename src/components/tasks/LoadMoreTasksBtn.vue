<template>
  <button
    v-if="tasks?.length >= 10"
    @click="fetchMoreTasks(status, 5)"
    :class="`button ${btnColor} text-sm font-medium p-2 mx-auto my-2 rounded-lg`"
  >
    Load more
  </button>
</template>

<script lang="ts">
export default {
  name: 'LoadMoreTasksBtn',
  props: ['tasks', 'fetchMoreTasks', 'btnColor', 'status']
}
</script>
