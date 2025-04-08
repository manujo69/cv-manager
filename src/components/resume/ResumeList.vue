<template>
  <div class="item-list-component">
    <div class="resume-list">
      <div class="resume-item-container" v-for="item in sortedResumeInfo" :key="item.id">
        <Toolbar>
          <template #start>
            <div class="resume-item">
              <div class="resume-content">
                <h3>{{ item.name }}</h3>

                <h4>Oferta asociada</h4>

                <div class="h4-block">
                  <u v-if="item.jobID">{{ getJobCompany(item.jobID) }}</u>
                  <div>{{ getJobPosition(item.jobID) }}</div>
                </div>

                <h4>Datos Personales</h4>

                <div class="h4-block">
                  <u v-if="item.personalInfo['firstName'] && item.personalInfo['lastName']">
                    {{ getPersonalData('firstName') }} {{ getPersonalData('lastName') }}
                  </u>
                  <div>
                    <template v-if="item.personalInfo['address']">
                      {{ getPersonalData('address') }}&nbsp;
                    </template>
                    <template v-if="item.personalInfo['postalCode']"
                      >{{ getPersonalData('postalCode') }} -
                    </template>
                    <template v-if="item.personalInfo['city']"
                      >{{ getPersonalData('city') }}&nbsp;
                    </template>
                    <template v-if="item.personalInfo['country']">
                      ({{ getPersonalData('country') }})
                    </template>
                    <template v-if="item.personalInfo['email']"
                      ><br />{{ getPersonalData('email') }}</template
                    >
                    <template v-if="item.personalInfo['phone']"
                      ><br />{{ getPersonalData('phone') }}</template
                    >
                    <template v-if="item.personalInfo['about']"
                      ><br />{{ getPersonalData('about') }}</template
                    >
                  </div>
                </div>

                <div v-if="item.experienceIDS?.length > 0">
                  <h4>Experiencia</h4>
                  <ul>
                    <li v-for="exp in item.experienceIDS" :key="exp.id">
                      {{ exp }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>

          <template #end>
            <PrimeButton
              icon="pi pi-trash"
              class="mr-2"
              severity="secondary"
              text
              @click="deleteResume(item.id)"
            />
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
      <PrimeButton @click="$emit('elementIdEdit', NEW_ELEMENT)">Añadir CV</PrimeButton>
    </div>
  </div>
</template>

<script lang="ts">
import { CVdata, NEW_ELEMENT, Job, DEFAULT_PERSONAL_INFO_BOOLEAN } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import PrimeButton from 'primevue/button'
import Toolbar from 'primevue/toolbar'

export default defineComponent({
  name: 'ResumeList',
  methods: {
    ...mapActions('curriculum', ['loadCvs', 'removeCv']),
    getJobPosition(jobId: number) {
      const job = this.jobs.find((j: Job) => j.id === jobId)
      return job ? job.position : 'No asociado'
    },
    getJobCompany(jobId: number) {
      const job = this.jobs.find((j: Job) => j.id === jobId)
      return job ? job.company : 'No asociado'
    },
    getPersonalData(key: string) {
      const personalData = this.personalInfo
      return personalData ? personalData[key] : 'No disponible'
    },
    deleteResume(id: number) {
      this.removeCv(id)
    },
  },
  computed: {
    ...mapState('curriculum', ['cvs']),
    ...mapState('job', ['jobs']),
    ...mapState('personal', ['personalInfo']),
    sortedResumeInfo(): CVdata[] {
      const resumes = [...this.cvs]
      return resumes.sort((a, b) => b.id - a.id) // Sort by ID in descending order (newest first)
    },
  },
  components: { PrimeButton, Toolbar },
  emits: ['elementIdEdit'],
  setup() {
    const store = useStore()

    const cvs = computed(() => store.state.curriculum.cvs)

    const editableInfo = reactive<Array<CVdata>>([
      {
        id: 0,
        name: '',
        jobID: 0,
        experienceIDS: [],
        educationIDS: [],
        skills: [],
        languages: [],
        PDFsource: '',
        IAprompt: '',
        personalInfo: DEFAULT_PERSONAL_INFO_BOOLEAN,
      },
    ])

    watch(
      cvs,
      (newInfo) => {
        if (newInfo) {
          const editableInfoItem = {} as CVdata
          Object.assign(editableInfoItem, newInfo)
          editableInfo.push(editableInfoItem)
        }
      },
      { immediate: true },
    )

    onMounted(() => {
      store.dispatch('curriculum/loadCvs').then(() => {
        store.dispatch('job/loadJobs').then(() => {
          store.dispatch('personal/loadPersonalInfo').then(() => {
            console.log('Data loaded')
          })
        })
      })
    })

    return {
      cvs,
      editableInfo,
      NEW_ELEMENT,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;

.item-list-component {
  .resume-list {
    h4 {
      color: rgb(117, 93, 93);
      font-weight: 600;
      margin: 2rem 0 0.5rem;
      background-color: #f0f0f0;
      padding: 0.3rem 1rem;
    }
    .h4-block {
      padding-left: 1rem;
    }
    .resume-item-container {
      margin: 20px 16px 20px;
    }
    .resume-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding: 0 1rem;
      border-radius: 0.5rem;

      .resume-content {
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
