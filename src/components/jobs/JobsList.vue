<template>
  <div class="item-list-component">
    <div class="job-list">
      <div class="job-item-container" v-for="item in sortedJobInfo" :key="item.id">
        <Toolbar>
          <template #start>
            <div class="job-item">
              <div class="job-content">
                <h3>{{ item.company }}</h3>

                <div>
                  <div>{{ item.position }}</div>
                  <template v-if="item.location">{{ item.location }} </template>
                </div>
                <br />
                <div v-if="item.dateApplied">
                  Fecha de aplicación: {{ formatDate(item.dateApplied) }}
                </div>
                <div v-if="item.status">Estado: {{ item.status }}</div>
                <div v-if="item.notes">Notas: {{ item.notes }}</div>
                <div v-if="item.url">
                  <br />
                  Link a la oferta:
                  <a :href="item.url" target="_blank" rel="noopener noreferrer"
                    >{{ item.company }} - {{ item.position }}</a
                  >
                </div>
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
      <PrimeButton @click="$emit('elementIdEdit', NEW_ELEMENT)">Añadir oferta</PrimeButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Job, NEW_ELEMENT } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import { formatDate, orderByDateApplied } from '@/utils/DateFormat'

import PrimeButton from 'primevue/button'
import Toolbar from 'primevue/toolbar'

export default defineComponent({
  name: 'JobsList',
  methods: {
    ...mapActions('job', ['loadJobs']),
    formatDate,
  },
  computed: {
    ...mapState('job', ['jobInfo']),
    sortedJobInfo(): Job[] {
      const jobs = [...this.jobInfo]
      return jobs.sort(orderByDateApplied)
    },
  },
  components: { PrimeButton, Toolbar },
  emits: ['elementIdEdit'],
  setup() {
    const store = useStore()

    const jobInfo = computed(() => store.state.job.jobs)

    const editableInfo = reactive<Array<Job>>([
      {
        id: 0,
        company: '',
        position: '',
        location: '',
        url: '',
        dateApplied: null,
        status: 'Solicitado',
        notes: '',
      },
    ])

    watch(
      jobInfo,
      (newInfo) => {
        if (newInfo) {
          const editableInfoItem = {} as Job
          Object.assign(editableInfoItem, newInfo)
          editableInfo.push(editableInfoItem)
        }
      },
      { immediate: true },
    )

    onMounted(() => {
      store.dispatch('job/loadJobs')
    })

    return {
      jobInfo,
      editableInfo,
      NEW_ELEMENT,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;

.item-list-component {
  .job-list {
    .job-item-container {
      margin: 20px 16px 20px;
    }
    .job-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding: 0 1rem;
      border-radius: 0.5rem;

      .job-content {
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
