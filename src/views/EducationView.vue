<template>
  <h2>Estudios realizados</h2>
  <Card>
    <template #content>
      <div class="education-view">
        <education-list v-if="elementID === DONT_SHOW" @element-id-edit="elementID = $event" />
        <education-form
          v-if="elementID !== DONT_SHOW"
          :element-id="elementID"
          @close="showEditForm(DONT_SHOW)"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EducationList from '@/components/education/EducationList.vue'
import EducationForm from '@/components/education/EducationForm.vue'

import { DONT_SHOW } from '@/models'
import Card from 'primevue/card'

export default defineComponent({
  name: 'ExperienceView',
  components: {
    EducationList,
    EducationForm,
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
