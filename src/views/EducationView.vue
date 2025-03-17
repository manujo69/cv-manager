<template>
  <div class="experience-view">
    <h2>Estudios realizados</h2>
    <education-list v-if="elementID === DONT_SHOW" @element-id-edit="elementID = $event" />
    <education-form
      v-if="elementID !== DONT_SHOW"
      :element-id="elementID"
      @close="showEditForm(DONT_SHOW)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EducationList from '@/components/education/EducationList.vue'
import EducationForm from '@/components/education/EducationForm.vue'

import { DONT_SHOW } from '@/models'

export default defineComponent({
  name: 'ExperienceView',
  components: {
    EducationList,
    EducationForm,
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
