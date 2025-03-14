<template>
  <div class="resume-view">
    <h2>Información personal</h2>
    <personal-info-list v-if="!showEditForm" @toggle-edit="toggleEditForm" />
    <personal-info-form v-if="showEditForm" @close="showEditForm = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PersonalInfoList from '../components/personalinfo/PersonalInfoList.vue'
import PersonalInfoForm from '../components/personalinfo/PersonalInfoForm.vue'

export default defineComponent({
  name: 'ResumeView',
  components: {
    PersonalInfoList,
    PersonalInfoForm,
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
