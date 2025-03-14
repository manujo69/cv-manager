<template>
  <div class="jobs-view">
    <h2>Ofertas de Trabajo</h2>
    <jobs-list />
    <jobs-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import JobsList from '@/components/jobs/JobsList.vue'
import JobsForm from '@/components/jobs/JobsForm.vue'

export default defineComponent({
  name: 'JobsView',
  components: {
    JobsList,
    JobsForm,
  },
})
</script>
