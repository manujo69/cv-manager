<template>
  <div class="jobs-view">
    <h2>Ofertas de Trabajo</h2>
    <Card>
      <template #content>
        <div class="jobs-view-content">
          <jobs-list v-if="elementID === DONT_SHOW" @element-id-edit="elementID = $event" />
          <jobs-form
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
import JobsList from '@/components/jobs/JobsList.vue'
import JobsForm from '@/components/jobs/JobsForm.vue'
import Card from 'primevue/card'
import { DONT_SHOW } from '@/models'

export default defineComponent({
  name: 'JobsView',
  components: {
    JobsList,
    JobsForm,
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
