<template>
  <div class="jobs-form-component">
    <form @submit.prevent="saveJob">
      <div class="flex flex-col gap-2">
        <label for="company">Empresa:</label>
        <InputText id="company" v-model="editableInfo.company" required placeholder="Empresa" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="position">Puesto:</label>
        <InputText id="position" v-model="editableInfo.position" required placeholder="Puesto" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="location">Ubicación:</label>
        <InputText id="location" v-model="editableInfo.location" placeholder="Ubicación" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="url">URL:</label>
        <InputText id="url" v-model="editableInfo.url" type="url" placeholder="URL" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="dateApplied">Fecha de Aplicación:</label>
        <DatePicker
          id="dateApplied"
          v-model="editableInfo.dateApplied"
          dateFormat="dd/mm/yy"
          :showIcon="true"
          :pt="{
            root: { style: { fontFamily: 'Arial, sans-serif' } },
            label: { style: { fontFamily: 'Arial, sans-serif' } },
            item: { style: { fontFamily: 'Arial, sans-serif' } },
            itemGroup: { style: { fontFamily: 'Arial, sans-serif' } },
            panel: { style: { fontFamily: 'Arial, sans-serif' } },
          }"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="status">Estado:</label>
        <PrimeSelect
          id="status"
          v-model="editableInfo.status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          :pt="{
            root: { style: { fontFamily: 'Arial, sans-serif' } },
            label: { style: { fontFamily: 'Arial, sans-serif' } },
            item: { style: { fontFamily: 'Arial, sans-serif' } },
            itemGroup: { style: { fontFamily: 'Arial, sans-serif' } },
            panel: { style: { fontFamily: 'Arial, sans-serif' } },
          }"
          required
          placeholder="Selecciona un estado"
          class="prime-select w-full md:w-56"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="notes">Notas:</label>
        <PrimeTextarea id="notes" v-model="editableInfo.notes" placeholder="Notas" />
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

import type { Job, JobStatusType } from '../../models'
import { NEW_ELEMENT } from '@/models'

import PrimeButton from 'primevue/button'
import InputText from 'primevue/inputtext'
import PrimeTextarea from 'primevue/textarea'
import PrimeSelect from 'primevue/select'
import DatePicker from 'primevue/datepicker'

export default defineComponent({
  name: 'JobsForm',
  emits: ['close'],
  props: {
    elementId: {
      type: Number,
      required: true,
      default: NEW_ELEMENT,
    },
  },
  methods: {
    ...mapActions('job', ['loadJobs', 'saveJob']),
  },
  computed: {
    ...mapState('job', ['jobInfo']),
  },
  components: { PrimeButton, InputText, PrimeTextarea, PrimeSelect, DatePicker },
  setup(props, { emit }) {
    const store = useStore()

    const jobInfo = computed(() => store.state.job.jobs)

    const editableInfo = reactive<Job>({
      id: props.elementId === NEW_ELEMENT ? 0 : props.elementId,
      company: '',
      position: '',
      location: '',
      url: '',
      dateApplied: null,
      status: 'Solicitado',
      notes: '',
    })

    const statusOptions = [
      { label: 'Solicitado', value: 'Solicitado' as JobStatusType },
      { label: 'Entrevista', value: 'Entrevista' as JobStatusType },
      { label: 'Oferta', value: 'Oferta' as JobStatusType },
      { label: 'Rechazado', value: 'Rechazado' as JobStatusType },
      { label: 'Descartado', value: 'Descartado' as JobStatusType },
      { label: 'Finalizado', value: 'Finalizado' as JobStatusType },
    ]

    // Sincronizar editableInfo con el store
    watch(
      jobInfo,
      (newInfo) => {
        if (newInfo) {
          Object.assign(editableInfo, newInfo)
        }
      },
      { immediate: true },
    )

    // Cargar datos guardados en localStorage cuando el componente se monta
    onMounted(() => {
      store.dispatch('job/loadJobs').then(() => {
        // Después de cargar, inicializar el formulario
        initializeForm()
      })
    })

    const initializeForm = () => {
      if (props.elementId === NEW_ELEMENT) {
        // Crear nueva experiencia (resetear valores)
        Object.assign(editableInfo, {
          id: 0,
          company: '',
          position: '',
          location: '',
          url: '',
          dateApplied: '',
          status: 'Solicitado',
          notes: '',
        })
      } else {
        // Editar experiencia existente
        const jobToEdit = jobInfo.value.find((job: Job) => job.id === props.elementId)
        if (jobToEdit) {
          Object.assign(editableInfo, jobToEdit)
        }
      }
    }

    const saveJob = () => {
      store.dispatch('job/saveJob', { ...editableInfo })
      emit('close')
    }

    return {
      editableInfo,
      statusOptions,
      saveJob,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;

.jobs-form-component {
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
