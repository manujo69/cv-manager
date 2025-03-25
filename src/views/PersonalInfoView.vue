<template>
  <h2>Información personal</h2>
  <Card>
    <template #content>
      <div class="resume-view">
        <personal-info-list v-if="!showEditForm" @toggle-edit="toggleEditForm" />
        <personal-info-form v-if="showEditForm" @close="showEditForm = false" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PersonalInfoList from '../components/personalinfo/PersonalInfoList.vue'
import PersonalInfoForm from '../components/personalinfo/PersonalInfoForm.vue'

import Card from 'primevue/card'

export default defineComponent({
  name: 'ResumeView',
  components: {
    PersonalInfoList,
    PersonalInfoForm,
    Card,
  },
  setup() {
    const showEditForm = ref(false)

    const toggleEditForm = () => {
      showEditForm.value = !showEditForm.value
    }

    return {
      showEditForm,
      toggleEditForm,
    }
  },
})
</script>
