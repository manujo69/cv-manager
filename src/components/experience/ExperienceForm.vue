<template>
  <div class="experience-form-component">
    <form @submit.prevent="saveInfo">
      <div>
        <label for="title">Nombre:</label>
        <input id="title" v-model="editableInfo.title" type="text" required />
      </div>
      <div>
        <label for="company">Empresa:</label>
        <input id="company" v-model="editableInfo.company" type="text" required />
      </div>
      <div>
        <label for="startDate">Fecha de inicio:</label>
        <input id="startDate" v-model="editableInfo.startDate" type="date" required />
      </div>
      <div>
        <label for="endDate">Fecha de finalización:</label>
        <input id="endDate" v-model="editableInfo.endDate" type="date" />
      </div>
      <div>
        <label for="position">Cargo:</label>
        <input id="position" v-model="editableInfo.position" type="text" required />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="editableInfo.description" required></textarea>
      </div>
      <div>
        <label for="current">Actual:</label>
        <input id="current" v-model="editableInfo.current" type="checkbox" />
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import { Experience } from '../../models'

export default defineComponent({
  name: 'ExperienceForm',
  methods: {
    ...mapActions('experience', ['loadExperiences', 'saveExperience']),
  },
  computed: {
    ...mapState('experience', ['experienceInfo']),
  },
  props: {
    elementId: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  setup(props) {
    const store = useStore()

    const experienceInfo = computed(() => store.state.experience.experiences)

    const editableInfo = reactive<Experience>({
      id: props.elementId === -1 ? 0 : props.elementId,
      title: '',
      company: '',
      startDate: '',
      position: '',
      endDate: '',
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
      if (props.elementId === -1) {
        // Crear nueva experiencia (resetear valores)
        Object.assign(editableInfo, {
          id: 0,
          title: '',
          company: '',
          startDate: '',
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
      console.log(editableInfo)
      store.dispatch('experience/saveExperience', { ...editableInfo })
      // emit('close')
    }

    return {
      experienceInfo,
      editableInfo,
      saveInfo,
    }
  },
})
</script>

<style scoped>
.experience-form-component {
  /* Styles specific to this component */
  border: 1px solid #ccc;
  padding: 10px;
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
</style>
