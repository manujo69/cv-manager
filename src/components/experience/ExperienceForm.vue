<template>
  <div class="edit-form-component">
    <form @submit.prevent="saveInfo">
      <div class="flex flex-col gap-2">
        <label for="title">Nombre</label>
        <InputText id="title" v-model="editableInfo.title" type="text" required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="company">Empresa</label>
        <InputText id="company" v-model="editableInfo.company" type="text" required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="startDate">Fecha de inicio</label>
        <DatePicker
          id="startDate"
          v-model="editableInfo.startDate"
          dateFormat="dd/mm/yy"
          type="date"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="endDate">Fecha de finalización</label>
        <DatePicker id="endDate" v-model="editableInfo.endDate" dateFormat="dd/mm/yy" type="date" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="position">Cargo</label>
        <InputText id="position" v-model="editableInfo.position" type="text" required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="description">Descripción</label>
        <PrimeTextarea id="description" v-model="editableInfo.description" required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="current">Actual</label>
        <PrimeCheckBox id="current" v-model="editableInfo.current" binary />
      </div>

      <PrimeButton type="submit">Guardar</PrimeButton>
      <PrimeButton type="button" @click="$emit('close')">Cancelar</PrimeButton>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import { Experience, NEW_ELEMENT } from '@/models'

import PrimeButton from 'primevue/button'
import InputText from 'primevue/inputtext'
import PrimeTextarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'
import PrimeCheckBox from 'primevue/checkbox'

export default defineComponent({
  name: 'ExperienceForm',
  methods: {
    ...mapActions('experience', ['loadExperiences', 'saveExperience']),
  },
  computed: {
    ...mapState('experience', ['experienceInfo']),
  },
  components: { PrimeButton, InputText, PrimeTextarea, DatePicker, PrimeCheckBox },
  props: {
    elementId: {
      type: Number,
      required: true,
      default: NEW_ELEMENT,
    },
  },
  setup(props, { emit }) {
    const store = useStore()

    const experienceInfo = computed(() => store.state.experience.experiences)

    const editableInfo = reactive<Experience>({
      id: props.elementId === NEW_ELEMENT ? 0 : props.elementId,
      title: '',
      company: '',
      startDate: null,
      position: '',
      endDate: null,
      current: false,
      description: '',
    })

    // Sincronizar editableInfo con el store
    watch(
      experienceInfo,
      (newInfo) => {
        if (newInfo) {
          Object.assign(editableInfo, newInfo)
        }
      },
      { immediate: true },
    )

    onMounted(() => {
      store.dispatch('experience/loadExperiences').then(() => {
        // Después de cargar, inicializar el formulario
        initializeForm()
      })
    })

    // Función para inicializar el formulario con los datos correctos
    const initializeForm = () => {
      if (props.elementId === NEW_ELEMENT) {
        // Crear nueva experiencia (resetear valores)
        Object.assign(editableInfo, {
          id: 0,
          title: '',
          company: '',
          startDate: null,
          position: '',
          endDate: '',
          current: false,
          description: '',
        })
      } else {
        // Editar experiencia existente
        const experienceToEdit = experienceInfo.value.find(
          (exp: Experience) => exp.id === props.elementId,
        )
        if (experienceToEdit) {
          Object.assign(editableInfo, experienceToEdit)
        }
      }
    }

    const saveInfo = () => {
      store.dispatch('experience/saveExperience', { ...editableInfo })
      emit('close')
    }

    return {
      experienceInfo,
      editableInfo,
      saveInfo,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;
</style>
