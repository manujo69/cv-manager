<template>
  <div class="resume-form-component">
    <form @submit.prevent="saveResume">
      <div class="flex flex-col gap-2">
        <label for="name">Nombre:</label>
        <InputText id="name" v-model="editableInfo.name" required placeholder="Nombre" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="jobID">Oferta asociada:</label>
        <PrimeSelect
          id="jobID"
          v-model="editableInfo.jobID"
          :options="jobOptions"
          optionLabel="label"
          optionValue="value"
          :pt="{
            root: { style: { fontFamily: 'Arial, sans-serif' } },
            label: { style: { fontFamily: 'Arial, sans-serif' } },
            item: { style: { fontFamily: 'Arial, sans-serif' } },
            itemGroup: { style: { fontFamily: 'Arial, sans-serif' } },
            panel: { style: { fontFamily: 'Arial, sans-serif' } },
          }"
          placeholder="Selecciona una oferta"
          class="prime-select w-full md:w-56"
        />
      </div>

      <div class="flex gap-2">
        <PrimeButton type="submit">Guardar</PrimeButton>
        <PrimeButton type="button" @click="$emit('close')">Cancelar</PrimeButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, computed, onMounted } from 'vue'
import { useStore, mapState, mapActions } from 'vuex'

import type { CVdata, Job } from '../../models'
import { DEFAULT_PERSONAL_INFO_BOOLEAN, NEW_ELEMENT } from '@/models'

import PrimeButton from 'primevue/button'
import InputText from 'primevue/inputtext'
import PrimeSelect from 'primevue/select'

export default defineComponent({
  name: 'ResumeForm',
  emits: ['close'],
  props: {
    elementId: {
      type: Number,
      required: true,
      default: NEW_ELEMENT,
    },
  },
  methods: {
    ...mapActions('curriculum', ['loadCvs', 'saveCv']),
  },
  computed: {
    ...mapState('curriculum', ['cvs']),
    ...mapState('job', ['jobs']),
    ...mapState('personal', ['personalInfo']),
    jobOptions(): { label: string; value: number }[] {
      // Use this.jobInfo to get the latest data

      if (!this.jobs) {
        return [] // Return an empty array if jobInfo is undefined
      }

      return this.jobs.map((job: Job) => ({
        label: `${job.company} - ${job.position}`,
        value: job.id,
      }))
    },
  },
  components: { PrimeButton, InputText, PrimeSelect },
  setup(props, { emit }) {
    const store = useStore()

    const cvs = computed(() => store.state.curriculum.cvs)
    const personalInfoStore = computed(() => store.state.personal.personalInfo)

    const editableInfo = reactive<CVdata>({
      id: props.elementId === NEW_ELEMENT ? 0 : props.elementId,
      name: '',
      jobID: 0,
      experienceIDS: [],
      educationIDS: [],
      skills: [],
      languages: [],
      PDFsource: '',
      IAprompt: '',
      personalInfo: DEFAULT_PERSONAL_INFO_BOOLEAN,
    })

    // Sincronizar editableInfo con el store
    watch(
      cvs,
      (newInfo) => {
        if (newInfo) {
          // Find the correct cv to edit
          const cvToEdit = newInfo.find((cv: CVdata) => cv.id === props.elementId)
          if (cvToEdit) {
            Object.assign(editableInfo, cvToEdit)
          }
        }
      },
      { immediate: true },
    )

    // Cargar datos guardados en localStorage cuando el componente se monta
    onMounted(() => {
      store.dispatch('job/loadJobs').then(() => {
        store.dispatch('personal/loadPersonalInfo').then(() => {
          store.dispatch('curriculum/loadCvs').then(() => {
            // After loading, initialize the form
            initializeForm()
          })
        })
      })
    })

    const initializeForm = () => {
      if (props.elementId === NEW_ELEMENT) {
        // Create new resume (reset values)
        Object.assign(editableInfo, {
          id: 0,
          name: '',
          jobID: 0,
          experience: [],
          education: [],
          skills: [],
          languages: [],
          PDFsource: '',
          IAprompt: '',
          personalInfo: {},
        })
        const personalInfo = { ...personalInfoStore.value }
        const newPersonalInfo = personalInfo.map((info: { key: string; value: boolean }) => {
          info.value = true
          return info
        })
        editableInfo.personalInfo = newPersonalInfo
      } else {
        // Edit existing resume
        const cvToEdit = cvs.value.find((cv: CVdata) => cv.id === props.elementId)
        if (cvToEdit) {
          Object.assign(editableInfo, cvToEdit)
        }
      }
    }

    const saveResume = () => {
      // Update personalInfo before saving
      editableInfo.personalInfo = { ...personalInfoStore.value }
      store.dispatch('curriculum/saveCv', { ...editableInfo })
      emit('close')
    }

    return {
      editableInfo,
      saveResume,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;

.resume-form-component {
  padding: 10px;
  margin: auto;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.prime-select {
  font-family: 'Open Sans', sans-serif;
}

.prime-textarea {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem; // You can adjust the font size here if needed
}
</style>
