<template>
  <div class="my-component">
    <!-- Content of the component -->
    <ul>
      <li v-for="(item, index) in experienceInfo" :key="item.id">
        <div><b>Nombre: </b>{{ item.title }}</div>
        <div><b>Empresa: </b>{{ item.company }}</div>
        <div><b>Fecha de inicio: </b>{{ item.startDate }}</div>
        <div><b>Fecha de finalización: </b>{{ item.endDate }}</div>
        <div><b>Posición: </b>{{ item.position }}</div>
        <div><b>Descripción: </b>{{ item.description }}</div>
        <div class="button-container">
          <button @click="$emit('toggleEdit', index)">Editar</button>
        </div>
      </li>
    </ul>
  </div>
  <button @click="$emit('toggleEdit', NEW_ELEMENT)">Añadir experiencia</button>
</template>

<script lang="ts">
import { Experience } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

export default defineComponent({
  name: 'ExperienceList', // Optional: Give your component a name
  methods: {
    ...mapActions('experience', ['loadExperiences']),
  },
  computed: {
    ...mapState('experience', ['experienceInfo']),
  },
  emits: ['toggleEdit'],
  setup() {
    const store = useStore()

    const experienceInfo = computed(() => store.state.experience.experiences)

    const editableInfo = reactive<Array<Experience>>([
      {
        id: 0,
        title: '',
        company: '',
        startDate: '',
        position: '',
        endDate: '',
        current: false,
        description: '',
      },
    ])

    const NEW_ELEMENT = -1

    // Sincronizar editableInfo con el store
    watch(
      experienceInfo,
      (newInfo) => {
        if (newInfo) {
          const editableInfoItem = {} as Experience
          Object.assign(editableInfoItem, newInfo)
          editableInfo.push(editableInfoItem)
        }
      },
      { immediate: true },
    )

    onMounted(() => {
      store.dispatch('experience/loadExperiences')
    })

    return {
      experienceInfo,
      editableInfo,
      NEW_ELEMENT,
    }
  },
})
</script>

<style scoped>
.my-component {
  /* Styles specific to this component */
  border: 1px solid #ccc;
  padding: 10px;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
li {
  margin-bottom: 20px;
  list-style-type: none;
}
.button-container {
  margin-top: 10px;
}
</style>
