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
          <PrimeButton @click="$emit('elementIdEdit', index + 1)">Editar</PrimeButton>
        </div>
      </li>
    </ul>
  </div>
  <PrimeButton @click="$emit('elementIdEdit', NEW_ELEMENT)">Añadir experiencia</PrimeButton>
</template>

<script lang="ts">
import { Experience, NEW_ELEMENT } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import PrimeButton from 'primevue/button'

export default defineComponent({
  name: 'ExperienceList', // Optional: Give your component a name
  methods: {
    ...mapActions('experience', ['loadExperiences']),
  },
  computed: {
    ...mapState('experience', ['experienceInfo']),
  },
  components: { PrimeButton },
  emits: ['elementIdEdit'],
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

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;
</style>
