<template>
  <form @submit.prevent="handleSubmit" :id="formId" class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
    <div v-if="successMessage" class="text-green-500 mb-4">{{ successMessage }}</div>

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
  
  export default { // This is the crucial export statement!
    name: 'ContactForm', // Give the component a name (good practice)
    props: {
      formId: String,
      successMessage: String,
      errorMessage: String,
    },
    setup(props) {
      const formData = ref({ name: '', email: '', message: '' });
      const submitting = ref(false);
      const errorMessage = ref(null);
      const successMessage = ref(null);
  
      const handleSubmit = async () => {
        // ... (rest of the handleSubmit function remains the same)
      };
  
      return { formData, submitting, errorMessage, successMessage, handleSubmit };
    },
  }; // End of the component definition
  </script>
  
  <style scoped>
  /* Your CSS styles here */
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>