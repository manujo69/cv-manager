<template>
  <div class="my-component">
    <!-- Content of the component -->
    <p>This is my basic Vue component!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResumeForm', // Optional: Give your component a name
  // props: {}, // Optional: Define properties that can be passed to the component
  // data() { // Optional: Define reactive data
  //   return {
  //     message: 'Hello',
  //   };
  // },
  // methods: {}, // Optional: Define methods
  // computed: {}, // Optional: Define computed properties
  // mounted() {}, // Optional: Lifecycle hook - called when the component is mounted
})
</script>

<style scoped>
.my-component {
  /* Styles specific to this component */
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
