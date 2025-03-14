<template>
  <div class="experience-view">
    <h2>Estudios realizados</h2>
    <education-list />
    <education-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EducationList from '@/components/education/EducationList.vue'
import EducationForm from '@/components/education/EducationForm.vue'

export default defineComponent({
  name: 'ExperienceView',
  components: {
    EducationList,
    EducationForm,
  },
})
</script>
