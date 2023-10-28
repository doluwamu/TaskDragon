<template>
  <div
    v-if="edit === true"
    class="add-task-modal flex justify-center items-center z-50 text-black fixed top-0 left-0 h-full w-full"
  >
    <RouterLink to="/tasks" class="absolute top-0 left-0 bg-[#0007] h-full w-full"></RouterLink>
    <div
      class="modal-form bg-gray-800 text-white py-5 px-1 z-50 w-11/12 overflow-y-auto md:w-2/3 md:px-5"
    >
      <h1 class="mb-3 text-center text-3xl">{{ task?.title }}</h1>

      <!-- <p class="text-red-600 text-center" v-if="errMsg.length > 0">{{ errMsg }}</p>
      <p class="text-green-700 text-center" v-if="successMsg.length > 0">{{ successMsg }}</p> -->

      <form class="flex flex-col flex-wrap justify-center sm:flex-row" @submit.prevent="editTask">
        <div class="p-4 flex flex-col w-full sm:w-1/2">
          <label class="font-semibold">Title:<span class="text-red-600">*</span> </label>
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
            <option class="text-[#cdcdcd]" value="">---Select---</option>
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
          <button
            v-if="taskStore.loaders.getTask"
            type="button"
            class="button bg-black text-white w-[150px] px-3 py-2"
          >
            Loading...
          </button>
          <button v-else type="submit" class="button bg-black text-white w-[150px] px-3 py-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'EditTaskModal',
  props: ['edit', 'task', 'taskStore', 'fetchTask'],
  data() {
    return {
      title: '',
      priority: '',
      description: ''
    }
  },
  mounted() {
    this.fetchTask(this.$route.query.tid)
    // if (!this.$route.query.edit || Boolean(this.$route.query.edit) === false) {
    //   this.task = {}
    // }
    // if (!this.task?.title) {
    //   this.fetchTask()
    // }
  },
  //   setup() {
  //     const taskStore = useTaskStore()
  //     return {
  //       taskStore
  //     }
  //   },

  methods: {
    editTask() {
      console.log('kk')
    }
  }
}
</script>

<style scoped>
.modal-form {
  animation-fill-mode: forwards;
  animation: modalOpen 0.2s linear;
}

@keyframes modalOpen {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

input,
select,
textarea {
  background-color: rgb(31 41 55);
}

input::placeholder,
textarea::placeholder {
  color: #cdcdcd;
}
</style>
