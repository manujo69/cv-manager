<template>
  <div class="resume-form-component">
    <form @submit.prevent="saveResume">
      <div class="flex flex-col gap-2">
        <label for="name">Nombre:</label>
        <InputText id="name" v-model="editableInfo.name" required placeholder="Nombre" />
      </div>

      <h4>Datos Personales</h4>

      <div class="h4-block">
        <u v-if="personalInfoStore['firstName'] && personalInfoStore['lastName']">
          {{ getPersonalData('firstName') }} {{ getPersonalData('lastName') }}
        </u>
        <div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox id="address" v-model="editableInfo.personalInfo['address']" binary />
                <label for="address">Dirección:</label>
              </div>
              <template v-if="personalInfoStore['address']">
                {{ getPersonalData('address') }}
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox id="email" v-model="editableInfo.personalInfo['email']" binary />
                <label for="email">Email:</label>
              </div>
              <template v-if="personalInfoStore['email']">
                {{ getPersonalData('email') }}
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox id="phone" v-model="editableInfo.personalInfo['phone']" binary />
                <label for="phone">Teléfono:</label>
              </div>
              <template v-if="personalInfoStore['phone']">
                {{ getPersonalData('phone') }}
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox
                  id="profilePicture"
                  v-model="editableInfo.personalInfo['profilePicture']"
                  binary
                />
                <label for="profilePicture">Foto de perfil:</label>
              </div>
              <template v-if="personalInfoStore['profilePicture']">
                {{ getPersonalData('profilePicture') }}
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox
                  id="profilePictureUrl"
                  v-model="editableInfo.personalInfo['profilePictureUrl']"
                  binary
                />
                <label for="profilePictureUrl">URL de la foto de perfil:</label>
              </div>
              <template v-if="personalInfoStore['profilePictureUrl']">
                {{ getPersonalData('profilePictureUrl') }}
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox
                  id="postalCode"
                  v-model="editableInfo.personalInfo['postalCode']"
                  binary
                />
                <label for="postalCode">Código Postal:</label>
              </div>
              <template v-if="personalInfoStore['postalCode']">
                {{ getPersonalData('postalCode') }} -
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox id="city" v-model="editableInfo.personalInfo['city']" binary />
                <label for="city">Ciudad:</label>
              </div>
              <template v-if="personalInfoStore['city']">
                {{ getPersonalData('city') }}&nbsp;
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox id="country" v-model="editableInfo.personalInfo['country']" binary />
                <label for="country">País:</label>
              </div>
              <template v-if="personalInfoStore['country']">
                ({{ getPersonalData('country') }})
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="checkbox-data-container">
              <div class="checkbox-container">
                <PrimeCheckBox id="about" v-model="editableInfo.personalInfo['about']" binary />
                <label for="about">Sobre mí:</label>
              </div>
              <template v-if="personalInfoStore['about']">
                <br />{{ getPersonalData('about') }}
              </template>
            </div>
          </div>
        </div>
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

import type { CVdata, Job, PersonalInfo } from '../../models'
import { DEFAULT_PERSONAL_INFO_BOOLEAN, NEW_ELEMENT } from '@/models'

import PrimeButton from 'primevue/button'
import InputText from 'primevue/inputtext'
import PrimeSelect from 'primevue/select'
import PrimeCheckBox from 'primevue/checkbox'

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
    getPersonalData(key: string): string {
      const value = this.personalInfoStore[key]
      if (typeof value === 'string') {
        return value
      } else if (value instanceof File) {
        return value.name
      } else {
        return 'No disponible: ' + key
      }
    },
  },
  computed: {
    ...mapState('curriculum', ['cvs']),
    ...mapState('job', ['jobs']),
    ...mapState('personal', ['personalInfo']),
    jobOptions(): { label: string; value: number }[] {
      if (!this.jobs) {
        return []
      }

      return this.jobs.map((job: Job) => ({
        label: `${job.company} - ${job.position}`,
        value: job.id,
      }))
    },
    personalInfoStore(): PersonalInfo {
      return this.personalInfo || {}
    },
  },
  components: { PrimeButton, InputText, PrimeSelect, PrimeCheckBox },
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
      personalInfo: { ...DEFAULT_PERSONAL_INFO_BOOLEAN },
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
          experienceIDS: [],
          educationIDS: [],
          skills: [],
          languages: [],
          PDFsource: '',
          IAprompt: '',
          personalInfo: { ...DEFAULT_PERSONAL_INFO_BOOLEAN },
        })
        if (personalInfoStore.value) {
          Object.keys(personalInfoStore.value).forEach((key) => {
            if (editableInfo.personalInfo.hasOwnProperty(key)) {
              editableInfo.personalInfo[key] = true
            }
          })
        }
      } else {
        // Edit existing resume
        const cvToEdit = cvs.value.find((cv: CVdata) => cv.id === props.elementId)
        if (cvToEdit) {
          Object.assign(editableInfo, cvToEdit)
        }
      }
    }

    const saveResume = () => {
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

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-data-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
