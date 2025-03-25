<template>
  <h2>Experiencia Laboral</h2>
  <Card>
    <template #content>
      <div class="experience-view">
        <experience-list v-if="elementID === DONT_SHOW" @element-id-edit="elementID = $event" />
        <experience-form
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
import ExperienceList from '@/components/experience/ExperienceList.vue'
import ExperienceForm from '@/components/experience/ExperienceForm.vue'

import Card from 'primevue/card'

import { DONT_SHOW } from '@/models'

export default defineComponent({
  name: 'ExperienceView',
  components: {
    ExperienceList,
    ExperienceForm,
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
