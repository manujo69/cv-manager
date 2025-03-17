<template>
  <div class="education-component">
    <ul>
      <li v-for="(item, index) in educationInfo" :key="item.id">
        <div><b>Institución: </b>{{ item.institution }}</div>
        <div><b>Título: </b>{{ item.degree }}</div>
        <div><b>Campo de estudio: </b>{{ item.field }}</div>
        <div><b>Fecha de inicio: </b>{{ item.startDate }}</div>
        <div>
          <b>Fecha de finalización: </b>
          {{ item.current ? 'En curso' : item.endDate || 'No especificado' }}
        </div>
        <div><b>Descripción: </b>{{ item.description }}</div>
        <div class="button-container">
          <button @click="$emit('elementIdEdit', index + 1)">Editar</button>
        </div>
      </li>
    </ul>
  </div>
  <button @click="$emit('elementIdEdit', NEW_ELEMENT)">Añadir educación</button>
</template>

<script lang="ts">
import { Education, NEW_ELEMENT } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

export default defineComponent({
  name: 'EducationList',
  methods: {
    ...mapActions('education', ['loadEducations']),
  },
  computed: {
    ...mapState('education', ['educationInfo']),
  },
  emits: ['elementIdEdit'],
  setup() {
    const store = useStore()

    const educationInfo = computed(() => store.state.education.educations)

    const editableInfo = reactive<Array<Education>>([
      {
        id: 0,
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ])

    // Sincronizar editableInfo con el store
    watch(
      educationInfo,
      (newInfo) => {
        if (newInfo) {
          const editableInfoItem = {} as Education
          Object.assign(editableInfoItem, newInfo)
          editableInfo.push(editableInfoItem)
        }
      },
      { immediate: true },
    )

    onMounted(() => {
      store.dispatch('education/loadEducations')
    })

    return {
      educationInfo,
      editableInfo,
      NEW_ELEMENT,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;
</style>
