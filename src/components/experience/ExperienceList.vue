<template>
  <div class="item-list-component">
    <!-- Content of the component -->
    <div class="experience-list">
      <div class="experience-item-container" v-for="item in sortedExperienceInfo" :key="item.id">
        <Toolbar>
          <template #start>
            <div class="experience-item">
              <div class="experience-content">
                <h3>{{ item.position }}</h3>

                <div>
                  {{ item.company }} - {{ formatDate(item.startDate) }}
                  <template v-if="item.endDate"> a {{ formatDate(item.endDate) }} </template>
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

          <!-- <template #end> <SplitButton label="Save"></SplitButton></template> -->
        </Toolbar>
      </div>
    </div>
    <div class="button-container">
      <PrimeButton @click="$emit('elementIdEdit', NEW_ELEMENT)">Añadir experiencia</PrimeButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Experience, NEW_ELEMENT } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import { formatDate, orderByStartDate } from '@/utils/DateFormat'

import PrimeButton from 'primevue/button'
import Toolbar from 'primevue/toolbar'

export default defineComponent({
  name: 'ExperienceList', // Optional: Give your component a name
  methods: {
    ...mapActions('experience', ['loadExperiences']),
    formatDate,
  },
  computed: {
    ...mapState('experience', ['experienceInfo']),
    sortedExperienceInfo(): Experience[] {
      const experiences = [...this.experienceInfo]
      return experiences.sort(orderByStartDate)
    },
  },
  components: { PrimeButton, Toolbar },
  emits: ['elementIdEdit'],
  setup() {
    const store = useStore()

    const experienceInfo = computed(() => store.state.experience.experiences)

    const editableInfo = reactive<Array<Experience>>([
      {
        id: 0,
        title: '',
        company: '',
        startDate: null,
        position: '',
        endDate: null,
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

.item-list-component {
  .experience-list {
    .experience-item-container {
      margin: 20px 16px 20px;
    }
    .experience-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding: 0 1rem;
      border-radius: 0.5rem;

      .experience-content {
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
