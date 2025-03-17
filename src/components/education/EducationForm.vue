<template>
  <div class="edit-form-component">
    <form @submit.prevent="saveInfo">
      <div>
        <label for="institution">Institución:</label>
        <input id="institution" v-model="editableInfo.institution" type="text" required />
      </div>
      <div>
        <label for="degree">Título:</label>
        <input id="degree" v-model="editableInfo.degree" type="text" required />
      </div>
      <div>
        <label for="field">Campo de estudio:</label>
        <input id="field" v-model="editableInfo.field" type="text" />
      </div>
      <div>
        <label for="startDate">Fecha de inicio:</label>
        <input id="startDate" v-model="editableInfo.startDate" type="date" />
      </div>
      <div>
        <label for="endDate">Fecha de finalización:</label>
        <input id="endDate" v-model="editableInfo.endDate" type="date" />
      </div>
      <div>
        <label for="current">Actual:</label>
        <input id="current" v-model="editableInfo.current" type="checkbox" />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="editableInfo.description"></textarea>
      </div>

      <button type="submit">Guardar</button>
      <button type="button" @click="$emit('close')">Cancelar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import { Education, NEW_ELEMENT } from '@/models'

export default defineComponent({
  name: 'EducationForm',
  methods: {
    ...mapActions('education', ['loadEducations', 'saveEducation']),
  },
  computed: {
    ...mapState('education', ['educationInfo']),
  },
  props: {
    elementId: {
      type: Number,
      required: true,
      default: NEW_ELEMENT,
    },
  },
  setup(props, { emit }) {
    const store = useStore()

    const educationInfo = computed(() => store.state.education.educations)

    const editableInfo = reactive({
      id: props.elementId === NEW_ELEMENT ? 0 : props.elementId,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    })

    watch(
      educationInfo,
      (newInfo) => {
        if (newInfo) {
          Object.assign(editableInfo, newInfo)
        }
      },
      { immediate: true },
    )

    onMounted(() => {
      store.dispatch('education/loadEducations').then(() => {
        // Después de cargar, inicializar el formulario
        initializeForm()
      })
    })

    const initializeForm = () => {
      if (props.elementId === NEW_ELEMENT) {
        Object.assign(editableInfo, {
          id: 0,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        })
      } else {
        const educationToEdit = educationInfo.value.find(
          (education: Education) => education.id === props.elementId,
        )
        if (educationToEdit) {
          Object.assign(editableInfo, educationToEdit)
        }
      }
    }

    const saveInfo = () => {
      console.log('editableInfo', editableInfo)
      store.dispatch('education/saveEducation', { ...editableInfo }).then(() => {
        emit('close')
      })
    }

    return {
      educationInfo,
      editableInfo,
      saveInfo,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;
</style>
