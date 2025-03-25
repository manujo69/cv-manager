<template>
  <div class="resume-view">
    <h2>Curriculum vitae</h2>
    <Card>
      <template #content>
        <div class="resume-view-content">
          <resume-list v-if="elementID === DONT_SHOW" @element-id-edit="elementID = $event" />
          <resume-form
            v-if="elementID !== DONT_SHOW"
            :element-id="elementID"
            @close="showEditForm(DONT_SHOW)"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ResumeForm from '@/components/resume/ResumeForm.vue'
import ResumeList from '@/components/resume/ResumeList.vue'
import Card from 'primevue/card'
import { DONT_SHOW } from '@/models'

export default defineComponent({
  name: 'ResumeView',
  components: {
    ResumeList,
    ResumeForm,
    Card,
  },
  setup() {
    const elementID = ref(DONT_SHOW)

    const showEditForm = (value: number) => {
      elementID.value = value
    }

    return {
      showEditForm,
      DONT_SHOW,
      elementID,
    }
  },
})
</script>
