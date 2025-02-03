<template>
  <form @submit.prevent="handleSubmit" :id="formId" class="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md transparent-form">
    <div v-if="error_message" class="text-red-500 mb-4" role="alert">{{ error_message }}</div>
    <div v-if="success_message" class="text-green-500 mb-4" role="alert">{{ success_message }}</div>
    
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
      <input type="text" id="name" v-model="formData.name" required
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
    </div>

    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
      <input type="email" id="email" v-model="formData.email" required
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
    </div>

    <div class="mb-6">
      <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Message:</label>
      <textarea id="message" v-model="formData.message" required
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 h-32"></textarea>
    </div>

    <button type="submit" :disabled="submitting"
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
      {{ submitting ? 'Submitting...' : 'Submit' }}
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ContactForm',
  props: {
    formId: String,
    success_message: String,
    error_message: String,
    name: String,
    email: String,
    message: String,
  },
  setup(props) {
    const formData = ref({ 
      name: props.name || '', 
      email: props.email || '', 
      message: props.message || '' 
    });
    const submitting = ref(false);
    const error_message = ref(null);
    const success_message = ref(null);

    const handleSubmit = async () => {
      if (!formData.value.name || !formData.value.email || !formData.value.message) {
        error_message.value = 'Please fill out all fields.';
        return;
      }

      submitting.value = true;
      error_message.value = null;
      success_message.value = null;

      try {
        const response = await fetch('/api/contact/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData.value),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        success_message.value = result.message || 'Form submitted successfully!';
        formData.value = { name: '', email: '', message: '' }; // Clear the form
      } catch (error) {
        error_message.value = error.message || 'There was an error submitting the form';
      } finally {
        submitting.value = false;
      }
    };

    return { formData, submitting, error_message, success_message, handleSubmit };
  },
};
</script>

<style scoped>
.transparent-form {
  background-color: transparent;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>