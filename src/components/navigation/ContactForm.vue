<template>
  <form @submit.prevent="handleSubmit" method="post" :id="formId">
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
    email: String,
    message: String,
    success_message: String,
    error_message: String,
    formId: String,
  },
  methods: {
    handleSubmit() {
      console.log('handleSubmit called');
      console.log("Name", this.name);
      console.log("Email", this.email);
      console.log("Message", this.message);
      console.log("Success message", this.success_message);
      console.log("Error message", this.error_message);
      console.log("Form ID", this.formId);
    },
  },
});
</script>