<template>
  <div
    v-if="add === true"
    class="add-task-modal flex justify-center items-center text-black absolute top-0 left-0 h-full w-full"
  >
    <div class="fixed top-0 left-0 bg-[#0007] h-full w-full"></div>
    <div class="bg-white py-5 px-1 z-50 w-11/12 overflow-y-auto h-[500px] md:w-2/3 md:px-5">
      <h1 class="mb-3 text-center text-3xl">Add a new task</h1>

      <form class="flex flex-col flex-wrap justify-center sm:flex-row" @submit.prevent="addTask">
        <div class="p-4 flex flex-col w-full sm:w-1/2">
          <label class="font-semibold">Title:<span class="text-red-600">*</span></label>
          <input
            type="text"
            name="title"
            v-model="title"
            placeholder="Write in title for your task"
          />
        </div>

        <div class="p-4 flex flex-col w-full sm:w-1/2">
          <label class="font-semibold">Priority:<span class="text-red-600">*</span></label>
          <select name="priority" v-model="priority">
            <option value="">---Select---</option>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="very-important">Very important</option>
          </select>
        </div>

        <div class="w-full p-4 flex flex-col">
          <label>Description:</label>
          <textarea
            name="description"
            id=""
            rows="7"
            placeholder="Write a task description"
            class="resize-none"
            v-model="description"
          ></textarea>
        </div>

        <div class="p-5">
          <button type="submit" class="button bg-black text-white w-[150px] px-3 py-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddTaskModal',
  props: ['add'],
  data() {
    return {
      title: '',
      priority: '',
      description: ''
    }
  },
  methods: {
    addTask() {
      console.log(this.title)
      console.log(this.description)
      console.log(this.priority)

      this.$router.push({
        name: 'tasks'
      })
    }
  }
}
</script>
