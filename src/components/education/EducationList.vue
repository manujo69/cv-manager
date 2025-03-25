<template>
  <div class="item-list-component">
    <div class="education-list">
      <div class="education-item-container" v-for="item in educationInfo" :key="item.id">
        <Toolbar>
          <template #start>
            <div class="education-item">
              <div class="education-content">
                <h3>{{ item.degree }}</h3>
                <div>{{ item.institution }}</div>
                <div><b>Campo de estudio: </b>{{ item.field }}</div>
                <div><b>Fecha de inicio: </b>{{ item.startDate }}</div>
                <div>
                  <b>Fecha de finalización: </b>
                  {{ item.current ? 'En curso' : item.endDate || 'No especificado' }}
                </div>
                <div>{{ item.description }}</div>
              </div>
            </div>
          </template>

          <template #end>
            <PrimeButton icon="pi pi-trash" class="mr-2" severity="secondary" text />
            <PrimeButton
              @click="$emit('elementIdEdit', item.id)"
              icon="pi pi-pen-to-square"
              class="mr-2"
              severity="secondary"
              text
            />
          </template>
        </Toolbar>
      </div>
    </div>
    <div class="button-container">
      <PrimeButton @click="$emit('elementIdEdit', NEW_ELEMENT)">Añadir educación</PrimeButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Education, NEW_ELEMENT } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import PrimeButton from 'primevue/button'
import Toolbar from 'primevue/toolbar'

export default defineComponent({
  name: 'EducationList',
  methods: {
    ...mapActions('education', ['loadEducations']),
  },
  computed: {
    ...mapState('education', ['educationInfo']),
  },
  components: { PrimeButton, Toolbar },
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

.item-list-component {
  .education-list {
    .education-item-container {
      margin: 20px 16px 20px;
    }
    .education-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding: 0 1rem;
      border-radius: 0.5rem;

      .education-content {
        flex: 1;

        h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          margin-top: 10px;
        }
      }
    }
  }
  .button-container {
    margin-left: 1rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
}
</style>
