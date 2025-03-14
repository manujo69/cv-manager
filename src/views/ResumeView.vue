<template>
  <div class="resume-view">
    <h2>Curriculum vitae</h2>
    <resume-list />
    <resume-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ResumeForm from '@/components/resume/ResumeForm.vue'
import ResumeList from '@/components/resume/ResumeList.vue'

export default defineComponent({
  name: 'ResumeView',
  components: {
    ResumeList,
    ResumeForm,
  },
})
</script>
