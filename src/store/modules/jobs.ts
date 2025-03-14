import type { Commit } from 'vuex'
import type { Job } from '../../models'

interface JobState {
  jobs: Job[]
}

export default {
  namespaced: true,
  state: (): JobState => ({
    jobs: [],
  }),
  getters: {
    getJobs: (state: JobState) => state.jobs,
  },
  mutations: {
    setJobs(state: JobState, jobs: Job[]) {
      state.jobs = jobs
    },
    addJob(state: JobState, job: Job) {
      state.jobs.push(job)
    },
    updateJob(state: JobState, updatedJob: Job) {
      const index = state.jobs.findIndex((j) => j.id === updatedJob.id)
      if (index !== -1) {
        state.jobs[index] = updatedJob
      }
    },
    deleteJob(state: JobState, id: number) {
      state.jobs = state.jobs.filter((j) => j.id !== id)
    },
  },
  actions: {
    loadJobs({ commit }: { commit: Commit }) {
      const savedJobs = localStorage.getItem('jobs')
      if (savedJobs) {
        commit('setJobs', JSON.parse(savedJobs))
      }
    },
    saveJob({ commit, state }: { commit: Commit; state: JobState }, job: Job) {
      let newJob = job

      // If it's a new job, generate an ID
      if (!job.id) {
        const maxId = state.jobs.reduce((max, j) => Math.max(max, j.id), 0)
        newJob = { ...job, id: maxId + 1 }
        commit('addJob', newJob)
      } else {
        commit('updateJob', newJob)
      }

      // Save to localStorage
      localStorage.setItem('jobs', JSON.stringify(state.jobs))
      return newJob
    },
    removeJob({ commit, state }: { commit: Commit; state: JobState }, id: number) {
      commit('deleteJob', id)
      localStorage.setItem('jobs', JSON.stringify(state.jobs))
    },
  },
}
