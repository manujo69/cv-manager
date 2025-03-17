<template>
  <div class="experience-view">
    <h2>Experiencia Laboral</h2>
    <experience-list v-if="elementID === DONT_SHOW" @element-id-edit="elementID = $event" />
    <experience-form
      v-if="elementID !== DONT_SHOW"
      :element-id="elementID"
      @close="showEditForm(DONT_SHOW)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ExperienceList from '@/components/experience/ExperienceList.vue'
import ExperienceForm from '@/components/experience/ExperienceForm.vue'

import { DONT_SHOW } from '@/models'

export default defineComponent({
  name: 'ExperienceView',
  components: {
    ExperienceList,
    ExperienceForm,
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
